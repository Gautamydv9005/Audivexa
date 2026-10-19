import fs from 'fs';
import path from 'path';
import { config } from '../config/config.js';
import { jobQueue } from './queueService.js';
import { safeDelete } from '../utils/fileUtils.js';

/**
 * Scan directory and remove files older than maxAgeMs
 */
const cleanDirectory = async (directoryPath, maxAgeMs) => {
  try {
    if (!fs.existsSync(directoryPath)) return;

    const files = await fs.promises.readdir(directoryPath);
    const now = Date.now();

    for (const file of files) {
      if (file === '.gitkeep') continue;
      const filePath = path.join(directoryPath, file);
      try {
        const stats = await fs.promises.stat(filePath);
        if (stats.isFile()) {
          const fileAge = now - stats.mtimeMs;
          if (fileAge > maxAgeMs) {
            await safeDelete(filePath);
            console.log(`[Cleanup] Removed stale file: ${file}`);
          }
        }
      } catch (err) {
        // file might have been removed already
      }
    }
  } catch (err) {
    console.error(`[Cleanup] Error scanning ${directoryPath}:`, err.message);
  }
};

/**
 * Perform complete cleanup sweep
 */
export const runCleanupSweep = async () => {
  console.log('[Cleanup] Starting periodic storage maintenance sweep...');
  await cleanDirectory(config.uploadsDir, config.fileMaxAgeMs);
  await cleanDirectory(config.outputsDir, config.fileMaxAgeMs);
  await cleanDirectory(config.tempDir, config.fileMaxAgeMs);
  await jobQueue.cleanupExpired();
  console.log('[Cleanup] Storage maintenance sweep complete.');
};

/**
 * Initialize background interval timer for automated file expiration
 */
export const startCleanupScheduler = () => {
  // Run sweep on startup
  runCleanupSweep().catch(err => console.error('[Cleanup] Initial sweep failed:', err));

  // Schedule interval
  const timer = setInterval(() => {
    runCleanupSweep().catch(err => console.error('[Cleanup] Sweep error:', err));
  }, config.cleanupIntervalMs);

  return timer;
};
