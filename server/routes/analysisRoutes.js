import express from 'express';
import {
  analyzeJob,
  getAnalysisHistory,
  getAnalysisById,
  getStats,
  healthCheck
} from '../controllers/analysisController.js';
import { protect } from '../middleware/auth.js';
import {
  validateJobInput,
  handleValidationErrors
} from '../utils/validation.js';

const router = express.Router();

// Health check (no auth required)
router.get('/health', healthCheck);

// Analyze a job offer (requires auth)
router.post(
  '/analyze',
  protect,
  validateJobInput,
  handleValidationErrors,
  analyzeJob
);

// Get analysis history (requires auth)
router.get('/history', protect, getAnalysisHistory);

// Get specific analysis by ID (requires auth)
router.get('/analysis/:id', protect, getAnalysisById);

// Get statistics (requires auth)
router.get('/stats', protect, getStats);

export default router;
