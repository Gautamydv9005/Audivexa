import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config.js';
import { ensureDirectoriesExist } from './utils/fileUtils.js';
import { startCleanupScheduler } from './services/cleanupService.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/api.js';

// Initialize directories
ensureDirectoriesExist();

// Initialize express app
const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all localhost/dev origins or configured client URL
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1') || origin === config.clientUrl) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for universal API consumption
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Range', 'Authorization'],
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Disposition'],
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    service: 'Audivexa Video-to-MP3 Engine API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Global error handler
app.use(errorHandler);

// Start background cleanup scheduler
startCleanupScheduler();

// Start server
const server = app.listen(config.port, () => {
  console.log(`=========================================`);
  console.log(`🚀 Audivexa API Server running on port ${config.port}`);
  console.log(`📡 Environment: ${config.nodeEnv}`);
  console.log(`📁 Uploads dir: ${config.uploadsDir}`);
  console.log(`📁 Outputs dir: ${config.outputsDir}`);
  console.log(`⏱️ Cleanup every: ${config.cleanupIntervalMs / 60000} mins`);
  console.log(`=========================================`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server gracefully.');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});

export default app;
