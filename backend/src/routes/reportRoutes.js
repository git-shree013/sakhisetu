import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', protect, (_req, res) => {
  res.json({
    members: 1248,
    savings: 2480000,
    activeLoans: 184,
    recoveryRate: 96.4,
    generatedAt: new Date().toISOString()
  });
});

export default router;
