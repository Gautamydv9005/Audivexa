import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ffmpegPath from 'ffmpeg-static';
import { config } from '../config/config.js';
import { safeDelete } from '../utils/fileUtils.js';

const resolvedFfmpeg = typeof ffmpegPath === 'string' ? ffmpegPath : (ffmpegPath?.default || 'ffmpeg');

/**
 * Validate YouTube URL
 */
export const isValidYouTubeUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  const pattern = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(watch\?v=|shorts\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/i;
  return pattern.test(trimmed);
};

/**
 * Clean URL and remove tracking parameters
 */
export const cleanYouTubeUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (match && match[1]) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  return url.trim();
};

let cachedYtDlp = null;

/**
 * Cross-platform detection of yt-dlp binary or Python runner
 */
export const resolveYtDlpCommand = () => {
  if (cachedYtDlp) return cachedYtDlp;

  const candidates = [
    { bin: 'yt-dlp', prefixArgs: [] },
    { bin: 'python3', prefixArgs: ['-m', 'yt_dlp'] },
    { bin: 'python', prefixArgs: ['-m', 'yt_dlp'] },
    { bin: 'py', prefixArgs: ['-m', 'yt_dlp'] },
  ];

  for (const cand of candidates) {
    try {
      execSync(`${cand.bin} ${cand.prefixArgs.join(' ')} --version`, { stdio: 'pipe' });
      cachedYtDlp = cand;
      return cand;
    } catch (e) {
      // try next candidate
    }
  }

  return { bin: process.platform === 'win32' ? 'python' : 'python3', prefixArgs: ['-m', 'yt_dlp'] };
};

/**
 * Fetch YouTube video metadata via yt-dlp
 */
export const getYouTubeInfo = (url) => {
  return new Promise((resolve, reject) => {
    const targetUrl = cleanYouTubeUrl(url);

    if (!isValidYouTubeUrl(targetUrl)) {
      return reject(new Error('Please enter a valid YouTube video URL (e.g. https://www.youtube.com/watch?v=...)'));
    }

    const { bin, prefixArgs } = resolveYtDlpCommand();

    const args = [
      ...prefixArgs,
      '--js-runtimes', 'node:node',
      '--dump-json',
      '--no-playlist',
      '--no-warnings',
      '--skip-download',
      targetUrl,
    ];

    const child = spawn(bin, args);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (err) => {
      reject(new Error(`Failed to execute YouTube parser: ${err.message}`));
    });

    child.on('close', (code) => {
      if (code !== 0) {
        const errMessage = stderr.toLowerCase();
        if (errMessage.includes('private video') || errMessage.includes('sign in')) {
          return reject(new Error('This YouTube video is private or restricted.'));
        }
        if (errMessage.includes('video unavailable') || errMessage.includes('not exist')) {
          return reject(new Error('YouTube video not found. Please check the URL.'));
        }
        return reject(new Error('Failed to retrieve video details from YouTube.'));
      }

      try {
        const data = JSON.parse(stdout);

        if (data.is_live) {
          return reject(new Error('Live streams cannot be converted. Please select an on-demand video.'));
        }

        const durationSeconds = Math.round(data.duration || 0);
        if (durationSeconds > 7200) {
          return reject(new Error('Video exceeds maximum duration limit of 2 hours.'));
        }

        // Best thumbnail selection
        let bestThumb = data.thumbnail || '';
        if (Array.isArray(data.thumbnails) && data.thumbnails.length > 0) {
          bestThumb = data.thumbnails[data.thumbnails.length - 1].url || bestThumb;
        }

        resolve({
          title: data.fulltitle || data.title || 'YouTube Audio',
          durationSeconds,
          author: data.uploader || data.channel || 'Unknown Artist',
          thumbnail: bestThumb,
          videoId: data.id,
        });
      } catch (err) {
        reject(new Error(`Error parsing YouTube response: ${err.message}`));
      }
    });
  });
};

/**
 * Download YouTube audio stream into temporary file
 */
export const downloadYouTubeAudioStream = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const targetUrl = cleanYouTubeUrl(url);
      const info = await getYouTubeInfo(targetUrl);

      const tempFilename = `yt_${uuidv4()}.webm`;
      const tempPath = path.join(config.tempDir, tempFilename);

      const { bin, prefixArgs } = resolveYtDlpCommand();

      const args = [
        ...prefixArgs,
        '--js-runtimes', 'node:node',
        '-f', 'ba/b',
        '--ffmpeg-location', resolvedFfmpeg,
        '-o', tempPath,
        '--no-playlist',
        '--no-warnings',
        targetUrl,
      ];

      const child = spawn(bin, args);

      let stderr = '';

      child.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      child.on('error', async (err) => {
        await safeDelete(tempPath);
        reject(new Error(`Failed to launch YouTube downloader: ${err.message}`));
      });

      child.on('close', async (code) => {
        if (code !== 0 || !fs.existsSync(tempPath)) {
          await safeDelete(tempPath);
          return reject(new Error('Failed to download YouTube audio stream.'));
        }

        resolve({
          tempPath,
          title: info.title,
          durationSeconds: info.durationSeconds,
          thumbnail: info.thumbnail,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};
