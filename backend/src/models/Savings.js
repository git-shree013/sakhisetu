import mongoose from 'mongoose';

const savingsSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Deposit', 'Withdrawal'], default: 'Deposit' },
  date: { type: Date, default: Date.now },
  note: { type: String, default: '' },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Savings', savingsSchema);
