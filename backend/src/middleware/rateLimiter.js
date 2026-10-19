import rateLimit from 'express-rate-limit';

// Standard rate limiter for API inspection and status checks
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

// Stricter rate limiter for conversion uploads and processing
export const conversionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 conversions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Conversion rate limit reached (30 conversions per 15 minutes). Please wait a few minutes before starting new conversions.',
  },
});
