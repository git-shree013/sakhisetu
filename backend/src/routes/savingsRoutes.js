import express from 'express';
import Savings from '../models/Savings.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (_req, res) => {
  const records = await Savings.find().sort({ createdAt: -1 }).limit(20);
  res.json(records);
});

router.post('/', protect, async (req, res) => {
  const record = await Savings.create(req.body);
  res.status(201).json(record);
});

export default router;
