import fs from 'fs';
import path from 'path';
import { jobQueue } from '../services/queueService.js';
import { config } from '../config/config.js';

/**
 * Handle video file upload and initiate conversion job
 */
export const uploadAndConvert = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please select a valid video file to upload.',
      });
    }

    const { bitrate } = req.body;
    const selectedBitrate = config.allowedBitrates.includes(bitrate) ? bitrate : config.defaultBitrate;

    const job = jobQueue.createFileJob({
      originalFilename: req.file.originalname,
      sourcePath: req.file.path,
      bitrate: selectedBitrate,
      fileSizeBytes: req.file.size,
    });

    return res.status(202).json({
      success: true,
      message: 'Video upload received. Conversion has started.',
      jobId: job.id,
      job: {
        id: job.id,
        displayName: job.displayName,
        bitrate: job.bitrate,
        status: job.status,
        fileSizeFormatted: job.fileSizeFormatted,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get job status and real-time progress
 */
export const getJobStatus = async (req, res) => {
  const { jobId } = req.params;
  const job = jobQueue.getJob(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      error: 'Conversion job not found or has expired.',
    });
  }

  return res.json({
    success: true,
    job: {
      id: job.id,
      type: job.type,
      displayName: job.displayName,
      thumbnail: job.thumbnail || null,
      status: job.status,
      progress: job.progress,
      bitrate: job.bitrate,
      durationSeconds: job.durationSeconds,
      durationFormatted: job.durationFormatted,
      fileSizeFormatted: job.fileSizeFormatted,
      outputSizeFormatted: job.outputSizeFormatted,
      error: job.error,
      completedAt: job.completedAt,
    },
  });
};

/**
 * Download converted MP3 file
 */
export const downloadConvertedFile = async (req, res) => {
  const { jobId } = req.params;
  const job = jobQueue.getJob(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      error: 'Job not found or file has expired.',
    });
  }

  if (job.status !== 'completed') {
    return res.status(400).json({
      success: false,
      error: `File is not ready yet. Current status: ${job.status}`,
    });
  }

  if (!fs.existsSync(job.outputPath)) {
    return res.status(404).json({
      success: false,
      error: 'Converted MP3 file was not found on the server. It may have expired.',
    });
  }

  // Safe download filename
  const downloadName = encodeURIComponent(job.outputFilename);
  res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"; filename*=UTF-8''${downloadName}`);
  res.setHeader('Content-Type', 'audio/mpeg');
  
  const filestream = fs.createReadStream(job.outputPath);
  filestream.pipe(res);
};

/**
 * Stream audio preview for in-browser player with HTTP Range support
 */
export const streamAudioPreview = async (req, res) => {
  const { jobId } = req.params;
  const job = jobQueue.getJob(jobId);

  if (!job || job.status !== 'completed' || !fs.existsSync(job.outputPath)) {
    return res.status(404).send('Audio preview not available');
  }

  const stat = await fs.promises.stat(job.outputPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(job.outputPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(200, head);
    fs.createReadStream(job.outputPath).pipe(res);
  }
};

/**
 * Service health & technical capabilities
 */
export const getHealthAndCapabilities = (req, res) => {
  res.json({
    status: 'ok',
    service: 'Audivexa API',
    supportedFormats: config.allowedExtensions,
    allowedBitrates: config.allowedBitrates,
    maxFileSizeMB: config.maxFileSizeMB,
    fileMaxAgeMinutes: config.fileMaxAgeMs / (60 * 1000),
  });
};
