import multer from 'multer';
import { config } from '../config/config.js';

export const errorHandler = (err, req, res, next) => {
  // Check for custom validation errors (e.g. Unsupported video format)
  if (err.message && err.message.includes('Unsupported video format')) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        error: `File size exceeds the limit of ${config.maxFileSizeMB} MB. Please upload a smaller video or select a lower resolution.`,
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Only one file can be processed per conversion request.',
      });
    }
    return res.status(400).json({
      success: false,
      error: `Upload error: ${err.message}`,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An internal server error occurred during processing.';

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};
