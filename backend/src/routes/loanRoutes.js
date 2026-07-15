import express from 'express';
import Loan from '../models/Loan.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (_req, res) => {
  const loans = await Loan.find().sort({ createdAt: -1 }).limit(20);
  res.json(loans);
});

router.post('/', protect, async (req, res) => {
  const loan = await Loan.create(req.body);
  res.status(201).json(loan);
});

export default router;
