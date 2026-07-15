import express from 'express';
import Meeting from '../models/Meeting.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (_req, res) => {
  const meetings = await Meeting.find().sort({ scheduledFor: 1 }).limit(20);
  res.json(meetings);
});

router.post('/', protect, async (req, res) => {
  const meeting = await Meeting.create(req.body);
  res.status(201).json(meeting);
});

export default router;
