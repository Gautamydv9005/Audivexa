import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { config } from '../config/config.js';
import { convertToMp3, getMediaMetadata } from './ffmpegService.js';
import { safeDelete, formatBytes, formatDuration, sanitizeFilename } from '../utils/fileUtils.js';

class JobQueue {
  constructor() {
    this.jobs = new Map();
    this.pendingQueue = [];
    this.activeJobsCount = 0;
  }

  /**
   * Create a new file conversion job
   */
  createFileJob({ originalFilename, sourcePath, bitrate = '320k', fileSizeBytes = 0 }) {
    const jobId = uuidv4();
    const parsedExt = path.extname(originalFilename);
    const baseName = sanitizeFilename(path.basename(originalFilename, parsedExt));
    const outputFilename = `${baseName}_${jobId.substring(0, 8)}.mp3`;
    const outputPath = path.join(config.outputsDir, outputFilename);

    const job = {
      id: jobId,
      type: 'file',
      originalFilename,
      displayName: baseName,
      outputFilename,
      sourcePath,
      outputPath,
      bitrate,
      status: 'queued', // queued, processing, completed, failed
      progress: 0,
      fileSizeBytes,
      fileSizeFormatted: formatBytes(fileSizeBytes),
      durationSeconds: 0,
      durationFormatted: '00:00',
      outputSizeBytes: 0,
      outputSizeFormatted: '0 Bytes',
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
      expiresAt: new Date(Date.now() + config.fileMaxAgeMs),
    };

    this.jobs.set(jobId, job);
    this.pendingQueue.push(jobId);
    this.processNext();

    return job;
  }

  /**
   * Create a YouTube conversion job
   */
  createYouTubeJob({ title, sourcePath, bitrate = '320k', durationSeconds = 0, thumbnail = '' }) {
    const jobId = uuidv4();
    const baseName = sanitizeFilename(title);
    const outputFilename = `${baseName}_${jobId.substring(0, 8)}.mp3`;
    const outputPath = path.join(config.outputsDir, outputFilename);

    const job = {
      id: jobId,
      type: 'youtube',
      originalFilename: `${title}.mp3`,
      displayName: baseName,
      thumbnail,
      outputFilename,
      sourcePath,
      outputPath,
      bitrate,
      status: 'queued',
      progress: 0,
      fileSizeBytes: 0,
      fileSizeFormatted: 'Calculating...',
      durationSeconds,
      durationFormatted: formatDuration(durationSeconds),
      outputSizeBytes: 0,
      outputSizeFormatted: '0 Bytes',
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
      expiresAt: new Date(Date.now() + config.fileMaxAgeMs),
    };

    this.jobs.set(jobId, job);
    this.pendingQueue.push(jobId);
    this.processNext();

    return job;
  }

  /**
   * Get job by ID
   */
  getJob(jobId) {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Process next queued job
   */
  async processNext() {
    if (this.activeJobsCount >= config.maxConcurrentJobs) {
      return;
    }

    const nextJobId = this.pendingQueue.shift();
    if (!nextJobId) return;

    const job = this.jobs.get(nextJobId);
    if (!job || job.status !== 'queued') {
      return this.processNext();
    }

    this.activeJobsCount++;
    job.status = 'processing';
    job.updatedAt = new Date();

    try {
      // 1. Probe input file for metadata and audio stream check
      const metadata = await getMediaMetadata(job.sourcePath);
      
      if (!metadata.hasAudio) {
        throw new Error('This video file does not contain any audio track to extract.');
      }

      job.durationSeconds = metadata.duration || job.durationSeconds;
      job.durationFormatted = formatDuration(job.durationSeconds);
      if (metadata.size && !job.fileSizeBytes) {
        job.fileSizeBytes = metadata.size;
        job.fileSizeFormatted = formatBytes(metadata.size);
      }

      // 2. Perform transcoding
      await convertToMp3({
        inputPath: job.sourcePath,
        outputPath: job.outputPath,
        bitrate: job.bitrate,
        totalDuration: job.durationSeconds,
        onProgress: ({ percent }) => {
          job.progress = percent;
          job.updatedAt = new Date();
        },
      });

      // 3. Mark completed & record output statistics
      const stats = await fs.promises.stat(job.outputPath);
      job.outputSizeBytes = stats.size;
      job.outputSizeFormatted = formatBytes(stats.size);
      job.status = 'completed';
      job.progress = 100;
      job.completedAt = new Date();
      job.updatedAt = new Date();

      // Clean up uploaded source video file immediately to preserve disk space and user privacy
      await safeDelete(job.sourcePath);
    } catch (err) {
      console.error(`[Job ${job.id}] Failed:`, err.message);
      job.status = 'failed';
      job.error = err.message || 'Conversion failed unexpectedly';
      job.updatedAt = new Date();

      // Clean up source file on error
      await safeDelete(job.sourcePath);
      // Clean up partial output if any
      await safeDelete(job.outputPath);
    } finally {
      this.activeJobsCount--;
      this.processNext();
    }
  }

  /**
   * Prune expired jobs and delete associated output files
   */
  async cleanupExpired() {
    const now = Date.now();
    for (const [jobId, job] of this.jobs.entries()) {
      if (job.expiresAt && now > new Date(job.expiresAt).getTime()) {
        await safeDelete(job.outputPath);
        await safeDelete(job.sourcePath);
        this.jobs.delete(jobId);
        console.log(`[Queue] Cleaned up expired job ${jobId}`);
      }
    }
  }
}

export const jobQueue = new JobQueue();
