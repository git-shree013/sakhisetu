import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import savingsRoutes from './routes/savingsRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import meetingRoutes from './routes/meetingRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'sakhisetu-api', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/reports', reportRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sakhisetu').then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((error) => {
  console.error('MongoDB connection failed', error);
  process.exit(1);
});
