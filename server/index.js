import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import analysisRoutes from './routes/analysisRoutes.js';
import authRoutes from './routes/authRoutes.js';
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
  corsOptions
} from './middleware/errorHandler.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const JSON_BODY_LIMIT = process.env.JSON_BODY_LIMIT || '10kb';
const URLENCODED_BODY_LIMIT = process.env.URLENCODED_BODY_LIMIT || '10kb';

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});

const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many analysis requests, please try again later.'
  }
});

// Middleware
app.use(helmet());
app.use(requestLogger);
app.use(express.json({ limit: JSON_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: URLENCODED_BODY_LIMIT }));
app.use(mongoSanitize());
app.use(cors(corsOptions));
app.use('/api', apiLimiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fake_job_detector')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analyzeLimiter);
app.use('/api', analysisRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info('📝 API Documentation:');
  logger.info('   POST   /api/analyze - Analyze a job offer');
  logger.info('   GET    /api/history - Get analysis history');
  logger.info('   GET    /api/analysis/:id - Get specific analysis');
  logger.info('   GET    /api/stats - Get statistics');
  logger.info('   GET    /api/health - Health check');
});
