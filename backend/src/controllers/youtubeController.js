import { getYouTubeInfo, downloadYouTubeAudioStream } from '../services/youtubeService.js';
import { jobQueue } from '../services/queueService.js';
import { config } from '../config/config.js';
import { formatDuration } from '../utils/fileUtils.js';

/**
 * Inspect a YouTube URL and retrieve title, thumbnail, duration
 */
export const inspectUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'YouTube URL is required.',
      });
    }

    const info = await getYouTubeInfo(url);
    return res.json({
      success: true,
      data: {
        title: info.title,
        durationSeconds: info.durationSeconds,
        durationFormatted: formatDuration(info.durationSeconds),
        author: info.author,
        thumbnail: info.thumbnail,
        fallbackThumbnail: info.fallbackThumbnail || info.thumbnail,
      },
    });
  } catch (err) {
    console.error('[YouTube Inspect Error]:', err.message);
    return res.status(400).json({
      success: false,
      error: err.message || 'Unable to inspect the provided YouTube URL.',
    });
  }
};

/**
 * Download YouTube audio and convert to MP3
 */
export const convertYouTube = async (req, res, next) => {
  try {
    const { url, bitrate } = req.body;
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'YouTube URL is required.',
      });
    }

    const selectedBitrate = config.allowedBitrates.includes(bitrate) ? bitrate : config.defaultBitrate;

    // Step 1: Download audio stream from YouTube to temp file
    const streamResult = await downloadYouTubeAudioStream(url);

    // Step 2: Queue for high-fidelity MP3 transcoding
    const job = jobQueue.createYouTubeJob({
      title: streamResult.title,
      sourcePath: streamResult.tempPath,
      bitrate: selectedBitrate,
      durationSeconds: streamResult.durationSeconds,
      thumbnail: streamResult.thumbnail,
    });

    return res.status(202).json({
      success: true,
      message: 'YouTube audio downloaded. MP3 transcoding has started.',
      jobId: job.id,
      job: {
        id: job.id,
        displayName: job.displayName,
        thumbnail: job.thumbnail,
        bitrate: job.bitrate,
        status: job.status,
        durationFormatted: job.durationFormatted,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message || 'Failed to process YouTube link.',
      code: err.code || 'CONVERSION_ERROR',
    });
  }
};
