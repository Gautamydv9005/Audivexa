import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import ffmpegPath from 'ffmpeg-static';
import { config } from '../config/config.js';
import { safeDelete } from '../utils/fileUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

const resolvedFfmpeg = typeof ffmpegPath === 'string' ? ffmpegPath : (ffmpegPath?.default || 'ffmpeg');

/**
 * Validate YouTube URL
 */
export const isValidYouTubeUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  const pattern = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(watch\?v=|shorts\/|v\/|embed\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/i;
  return pattern.test(trimmed);
};

/**
 * Extract 11-character YouTube video ID
 */
export const extractVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|v\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  return match ? match[1] : null;
};

/**
 * Clean URL and normalize to standard watch link
 */
export const cleanYouTubeUrl = (url) => {
  const videoId = extractVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return (url || '').trim();
};

let cachedYtDlp = null;

/**
 * Cross-platform detection of yt-dlp binary or Python runner
 */
export const resolveYtDlpCommand = () => {
  if (cachedYtDlp) return cachedYtDlp;

  // 1. Check project local bin directory (installed via install-ytdlp script on Linux/Render)
  const localBinary = path.join(rootDir, 'bin', process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');
  if (fs.existsSync(localBinary)) {
    try {
      execSync(`"${localBinary}" --version`, { stdio: 'pipe' });
      cachedYtDlp = { bin: localBinary, prefixArgs: [] };
      return cachedYtDlp;
    } catch {
      // ignore and try other candidates
    }
  }

  // 2. Check system PATH and Python module candidates
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
    } catch {
      // try next candidate
    }
  }

  return { bin: process.platform === 'win32' ? 'python' : 'python3', prefixArgs: ['-m', 'yt_dlp'] };
};

/**
 * Fast, reliable YouTube metadata fetch using official oEmbed and watch page scraper.
 * Does not require external binaries or Python and is not blocked by datacenter IP filters.
 */
export const fetchYouTubeWebMetadata = async (url) => {
  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error('Please enter a valid YouTube video URL (e.g. https://www.youtube.com/watch?v=...)');
  }

  // Step 1: Official YouTube oEmbed API
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  let oembedData = null;

  try {
    const oembedRes = await fetch(oembedUrl);
    if (oembedRes.status === 404) {
      throw new Error('YouTube video not found or unavailable. Please check the URL.');
    }
    if (oembedRes.status === 401 || oembedRes.status === 403) {
      throw new Error('This YouTube video is private or restricted by its owner.');
    }
    if (oembedRes.ok) {
      oembedData = await oembedRes.json();
    }
  } catch (err) {
    if (err.message.includes('not found') || err.message.includes('private')) {
      throw err;
    }
    console.warn('[YouTube Metadata] oEmbed warning:', err.message);
  }

  if (!oembedData) {
    throw new Error('Unable to retrieve video details from YouTube. Please verify the URL.');
  }

  // Step 2: Fetch public watch page to parse video duration and verify accessibility
  let durationSeconds = 0;
  const highResThumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const defaultThumb = oembedData.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  try {
    const watchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': 'CONSENT=PENDING+999; SOCS=CAESEwgDEgk2MTQyNjY5NjQaAmVuIAEaBgiA_LyaBg;',
      },
    });

    if (watchRes.ok) {
      const html = await watchRes.text();

      // Check for live stream
      if (html.includes('"isLive":true') || html.includes('"isLiveStream":true')) {
        throw new Error('Live streams cannot be converted. Please select an on-demand video.');
      }

      // Check lengthSeconds first
      const lengthMatch = html.match(/"lengthSeconds":"(\d+)"/);
      if (lengthMatch && lengthMatch[1]) {
        durationSeconds = parseInt(lengthMatch[1], 10);
      }

      // Extract duration in milliseconds
      if (!durationSeconds) {
        const durationMatch = html.match(/"approxDurationMs":"(\d+)"/);
        if (durationMatch && durationMatch[1]) {
          durationSeconds = Math.round(parseInt(durationMatch[1], 10) / 1000);
        }
      }

      // Fallback: ISO 8601 itemprop duration (e.g., PT5M9S)
      if (!durationSeconds) {
        const isoMatch = html.match(/itemprop="duration" content="PT([^"]+)"/);
        if (isoMatch && isoMatch[1]) {
          const pt = isoMatch[1];
          const hours = pt.match(/(\d+)H/);
          const mins = pt.match(/(\d+)M/);
          const secs = pt.match(/(\d+)S/);
          durationSeconds = (hours ? parseInt(hours[1], 10) * 3600 : 0) +
                            (mins ? parseInt(mins[1], 10) * 60 : 0) +
                            (secs ? parseInt(secs[1], 10) : 0);
        }
      }
    }
  } catch (err) {
    if (err.message.includes('Live streams')) throw err;
    console.warn('[YouTube Metadata] Watch page duration parse notice:', err.message);
  }

  if (durationSeconds > 7200) {
    throw new Error('Video exceeds maximum duration limit of 2 hours.');
  }

  return {
    title: oembedData.title || 'YouTube Audio',
    durationSeconds,
    author: oembedData.author_name || 'YouTube Creator',
    thumbnail: highResThumb,
    fallbackThumbnail: defaultThumb,
    videoId,
  };
};

/**
 * Fetch YouTube video metadata via fast web endpoint with yt-dlp fallback
 */
export const getYouTubeInfo = async (url) => {
  const targetUrl = cleanYouTubeUrl(url);

  if (!isValidYouTubeUrl(targetUrl)) {
    throw new Error('Please enter a valid YouTube video URL (e.g. https://www.youtube.com/watch?v=...)');
  }

  // Strategy 1: Fast & resilient web extraction (works reliably in cloud/serverless/Render)
  try {
    const webMetadata = await fetchYouTubeWebMetadata(targetUrl);
    return webMetadata;
  } catch (webErr) {
    // If it is a definitive error (not found, private, live, duration limit), fail immediately
    if (
      webErr.message.includes('private') ||
      webErr.message.includes('not found') ||
      webErr.message.includes('Live streams') ||
      webErr.message.includes('maximum duration')
    ) {
      throw webErr;
    }
    console.warn('[YouTube Info] Web extractor had issue, trying yt-dlp fallback:', webErr.message);
  }

  // Strategy 2: Fallback to yt-dlp --dump-json
  return new Promise((resolve, reject) => {
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
      console.error('[YouTube yt-dlp inspect error]:', err.message);
      reject(new Error(`Failed to execute YouTube parser: ${err.message}`));
    });

    child.on('close', (code) => {
      if (code !== 0) {
        const errMessage = stderr.toLowerCase();
        console.error('[YouTube yt-dlp inspect failed]', { code, stderr });
        if (errMessage.includes('private video') || errMessage.includes('sign in')) {
          return reject(new Error('This YouTube video is private or restricted.'));
        }
        if (errMessage.includes('video unavailable') || errMessage.includes('not exist')) {
          return reject(new Error('YouTube video not found. Please check the URL.'));
        }
        const lastLine = stderr.trim().split('\n').pop() || '';
        return reject(new Error(lastLine ? `YouTube error: ${lastLine}` : 'Failed to retrieve video details from YouTube.'));
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

        let bestThumb = data.thumbnail || '';
        if (Array.isArray(data.thumbnails) && data.thumbnails.length > 0) {
          bestThumb = data.thumbnails[data.thumbnails.length - 1].url || bestThumb;
        }

        resolve({
          title: data.fulltitle || data.title || 'YouTube Audio',
          durationSeconds,
          author: data.uploader || data.channel || 'Unknown Artist',
          thumbnail: bestThumb,
          fallbackThumbnail: data.thumbnail || '',
          videoId: data.id,
        });
      } catch (err) {
        reject(new Error(`Error parsing YouTube response: ${err.message}`));
      }
    });
  });
};

/**
 * Download YouTube audio stream into temporary file for FFmpeg conversion
 */
export const downloadYouTubeAudioStream = (url) => {
  return new Promise(async (resolve, reject) => {
    let tempPath = null;
    try {
      const targetUrl = cleanYouTubeUrl(url);
      const info = await getYouTubeInfo(targetUrl);

      const tempFilename = `yt_${uuidv4()}.webm`;
      tempPath = path.join(config.tempDir, tempFilename);

      const { bin, prefixArgs } = resolveYtDlpCommand();

      const args = [
        ...prefixArgs,
        '--js-runtimes', 'node:node',
        '-f', 'ba/b',
        '--extractor-args', 'youtube:player_client=android,web',
        '--ffmpeg-location', resolvedFfmpeg,
        '-o', tempPath,
        '--no-playlist',
        '--no-warnings',
        targetUrl,
      ];

      // Pass optional cookies if provided via environment or local file
      const cookiesFile = path.join(rootDir, 'cookies.txt');
      if (fs.existsSync(cookiesFile)) {
        args.splice(prefixArgs.length, 0, '--cookies', cookiesFile);
      }

      const child = spawn(bin, args);

      let stderr = '';

      child.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      child.on('error', async (err) => {
        if (tempPath) await safeDelete(tempPath);
        console.error('[YouTube Downloader Spawn Error]:', err.message);
        reject(new Error(`Failed to launch YouTube downloader: ${err.message}`));
      });

      child.on('close', async (code) => {
        if (code !== 0 || !fs.existsSync(tempPath)) {
          if (tempPath) await safeDelete(tempPath);
          const errText = stderr.trim();
          const lowerErr = errText.toLowerCase();

          // Gracefully detect YouTube bot challenge / datacenter IP block
          if (
            lowerErr.includes('sign in to confirm') ||
            lowerErr.includes('not a bot') ||
            lowerErr.includes('confirm you')
          ) {
            console.warn('[YouTube Downloader]: YouTube requires bot verification for cloud IP. Prompting upload fallback.');
            const botError = new Error('YouTube has restricted direct streaming on this video from cloud servers (bot verification required). Please use our direct Video Upload converter instead for instant, 100% reliable 320kbps MP3 conversion.');
            botError.code = 'YOUTUBE_BOT_RESTRICTION';
            return reject(botError);
          }

          if (lowerErr.includes('private video') || lowerErr.includes('private')) {
            return reject(new Error('This YouTube video is private or restricted by its owner.'));
          }
          if (lowerErr.includes('video unavailable') || lowerErr.includes('not exist')) {
            return reject(new Error('YouTube video is unavailable or restricted.'));
          }

          console.error('[YouTube Download Error]', { code, stderr: errText });
          const lastLine = errText.split('\n').pop() || '';
          return reject(new Error(lastLine ? `YouTube download failed: ${lastLine}` : 'Failed to download YouTube audio stream.'));
        }

        resolve({
          tempPath,
          title: info.title,
          durationSeconds: info.durationSeconds,
          thumbnail: info.thumbnail,
        });
      });
    } catch (err) {
      if (tempPath) await safeDelete(tempPath);
      reject(err);
    }
  });
};

