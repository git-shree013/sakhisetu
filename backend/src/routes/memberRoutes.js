import express from 'express';
import Member from '../models/Member.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (_req, res) => {
  const members = await Member.find().limit(20);
  res.json(members);
});

router.post('/', protect, async (req, res) => {
  const member = await Member.create(req.body);
  res.status(201).json(member);
});

export default router;
