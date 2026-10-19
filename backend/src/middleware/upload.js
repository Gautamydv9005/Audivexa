import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config.js';

// Storage configuration with secure UUID naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `upload_${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

// File validation filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (!config.allowedExtensions.includes(ext)) {
    return cb(
      new Error(`Unsupported video format "${ext}". Supported formats are: ${config.allowedExtensions.join(', ')}`),
      false
    );
  }

  cb(null, true);
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSizeBytes,
    files: 1,
  },
});
