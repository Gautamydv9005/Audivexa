import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB || '250', 10),
  get maxFileSizeBytes() {
    return this.maxFileSizeMB * 1024 * 1024;
  },
  jobTimeoutMs: parseInt(process.env.JOB_TIMEOUT_MS || '300000', 10),
  cleanupIntervalMs: parseInt(process.env.CLEANUP_INTERVAL_MINUTES || '5', 10) * 60 * 1000,
  fileMaxAgeMs: parseInt(process.env.FILE_MAX_AGE_MINUTES || '15', 10) * 60 * 1000,
  uploadsDir: path.join(rootDir, 'uploads'),
  outputsDir: path.join(rootDir, 'outputs'),
  tempDir: path.join(rootDir, 'temp'),
  allowedExtensions: [
    '.mp4', '.mov', '.webm', '.avi', '.mkv',
    '.flv', '.wmv', '.m4v', '.ts', '.3gp',
    '.mpeg', '.mpg', '.ogv'
  ],
  allowedBitrates: ['128k', '192k', '320k'],
  defaultBitrate: '320k',
  maxConcurrentJobs: 5,
};
