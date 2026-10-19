import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import fs from 'fs';
import { config } from '../config/config.js';

// Configure binary paths
try {
  const binaryPath = typeof ffmpegPath === 'string' ? ffmpegPath : (ffmpegPath?.default || 'ffmpeg');
  if (binaryPath) {
    ffmpeg.setFfmpegPath(binaryPath);
    console.log(`[FFmpeg] Using FFmpeg binary at: ${binaryPath}`);
  }
} catch (err) {
  console.warn('[FFmpeg] Could not set static ffmpeg path, relying on system PATH:', err.message);
}

try {
  const probePath = ffprobeStatic?.path || ffprobeStatic?.default?.path;
  if (probePath) {
    ffmpeg.setFfprobePath(probePath);
    console.log(`[FFprobe] Using FFprobe binary at: ${probePath}`);
  }
} catch (err) {
  console.warn('[FFprobe] Could not set static ffprobe path, relying on system PATH:', err.message);
}

/**
 * Extract technical metadata from a media file
 */
export const getMediaMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error('Media file not found for inspection'));
    }

    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return reject(new Error(`FFprobe error: ${err.message}`));
      }

      const duration = metadata.format?.duration ? parseFloat(metadata.format.duration) : 0;
      const size = metadata.format?.size ? parseInt(metadata.format.size, 10) : 0;
      const formatName = metadata.format?.format_name || 'unknown';
      
      const audioStreams = (metadata.streams || []).filter(s => s.codec_type === 'audio');
      const videoStreams = (metadata.streams || []).filter(s => s.codec_type === 'video');

      const hasAudio = audioStreams.length > 0;
      const primaryAudio = audioStreams[0] || null;

      resolve({
        duration,
        size,
        formatName,
        hasAudio,
        audioCodec: primaryAudio?.codec_name || null,
        audioSampleRate: primaryAudio?.sample_rate || 44100,
        audioChannels: primaryAudio?.channels || 2,
        hasVideo: videoStreams.length > 0,
        videoCodec: videoStreams[0]?.codec_name || null,
        width: videoStreams[0]?.width || null,
        height: videoStreams[0]?.height || null,
      });
    });
  });
};

/**
 * Parse timemark string (e.g. "00:01:23.45") into seconds
 */
const parseTimemark = (timemark) => {
  if (!timemark || typeof timemark !== 'string') return 0;
  const parts = timemark.split(':');
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]) || 0;
    const minutes = parseFloat(parts[1]) || 0;
    const seconds = parseFloat(parts[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
};

/**
 * Transcode input video/audio file into high fidelity MP3
 */
export const convertToMp3 = ({
  inputPath,
  outputPath,
  bitrate = '320k',
  totalDuration = 0,
  onProgress = () => {},
}) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(inputPath)) {
      return reject(new Error('Input video file does not exist'));
    }

    const validBitrate = config.allowedBitrates.includes(bitrate) ? bitrate : config.defaultBitrate;
    let isFinished = false;

    const command = ffmpeg(inputPath)
      .noVideo()
      .audioCodec('libmp3lame')
      .audioBitrate(validBitrate.replace('k', ''))
      .audioChannels(2)
      .audioFrequency(44100)
      .format('mp3')
      .output(outputPath);

    // Timeout watchdog
    const timeout = setTimeout(() => {
      if (!isFinished) {
        isFinished = true;
        try {
          command.kill('SIGKILL');
        } catch (e) {
          // ignore
        }
        reject(new Error(`Conversion timed out after ${config.jobTimeoutMs / 1000} seconds`));
      }
    }, config.jobTimeoutMs);

    command.on('progress', (progress) => {
      if (isFinished) return;

      let percent = 0;
      if (progress.percent && !isNaN(progress.percent) && progress.percent > 0) {
        percent = Math.min(Math.round(progress.percent), 99);
      } else if (totalDuration > 0 && progress.timemark) {
        const currentSec = parseTimemark(progress.timemark);
        percent = Math.min(Math.round((currentSec / totalDuration) * 100), 99);
      } else {
        percent = 50;
      }

      onProgress({
        percent,
        currentTimemark: progress.timemark,
        currentKbps: progress.currentKbps,
      });
    });

    command.on('end', () => {
      if (isFinished) return;
      isFinished = true;
      clearTimeout(timeout);
      onProgress({ percent: 100 });
      resolve({
        outputPath,
        bitrate: validBitrate,
      });
    });

    command.on('error', (err) => {
      if (isFinished) return;
      isFinished = true;
      clearTimeout(timeout);
      reject(new Error(`FFmpeg transcoding error: ${err.message}`));
    });

    // Start conversion
    command.run();
  });
};
