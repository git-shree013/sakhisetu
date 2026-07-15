import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  amount: { type: Number, required: true },
  tenureMonths: { type: Number, required: true },
  interestRate: { type: Number, default: 12 },
  status: { type: String, enum: ['Approved', 'Pending', 'Overdue', 'Cleared'], default: 'Pending' },
  repaymentSchedule: { type: [String], default: [] },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Loan', loanSchema);
