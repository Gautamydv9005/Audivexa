import express from 'express';
import {
  uploadAndConvert,
  getJobStatus,
  downloadConvertedFile,
  streamAudioPreview,
  getHealthAndCapabilities,
} from '../controllers/convertController.js';
import {
  inspectUrl,
  convertYouTube,
} from '../controllers/youtubeController.js';
import { uploadMiddleware } from '../middleware/upload.js';
import { apiLimiter, conversionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Health and technical diagnostics
router.get('/health', getHealthAndCapabilities);

// File upload conversion route
router.post(
  '/convert/upload',
  conversionLimiter,
  uploadMiddleware.single('video'),
  uploadAndConvert
);

// YouTube routes
router.post('/convert/youtube/inspect', apiLimiter, inspectUrl);
router.post('/convert/youtube', conversionLimiter, convertYouTube);

// Status and retrieval routes
router.get('/convert/status/:jobId', apiLimiter, getJobStatus);
router.get('/convert/download/:jobId', downloadConvertedFile);
router.get('/convert/stream/:jobId', streamAudioPreview);

export default router;
