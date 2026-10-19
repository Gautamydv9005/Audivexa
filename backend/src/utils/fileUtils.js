import fs from 'fs';
import path from 'path';
import { config } from '../config/config.js';

/**
 * Ensure required runtime directories exist
 */
export const ensureDirectoriesExist = () => {
  const dirs = [config.uploadsDir, config.outputsDir, config.tempDir];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

/**
 * Sanitize filename to prevent directory traversal and remove unsafe chars
 */
export const sanitizeFilename = (filename) => {
  if (!filename || typeof filename !== 'string') return 'audio';
  // Remove path separators and null bytes
  let cleaned = filename.replace(/[/\\?%*:|"<>]/g, '_').trim();
  // Strip control characters
  cleaned = cleaned.replace(/[\x00-\x1f\x80-\x9f]/g, '');
  // Limit length
  if (cleaned.length > 100) {
    const ext = path.extname(cleaned);
    const base = path.basename(cleaned, ext);
    cleaned = base.substring(0, 95) + ext;
  }
  return cleaned || 'audio';
};

/**
 * Format bytes to human readable format
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
export const formatDuration = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds)) return '00:00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num) => String(num).padStart(2, '0');
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};

/**
 * Safe file deletion without throwing uncaught exceptions
 */
export const safeDelete = async (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    }
  } catch (err) {
    console.error(`Failed to delete file at ${filePath}:`, err.message);
  }
  return false;
};
