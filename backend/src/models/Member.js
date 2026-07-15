import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, lowercase: true },
  joiningDate: { type: Date, default: Date.now },
  savingsBalance: { type: Number, default: 0 },
  loanStatus: { type: String, enum: ['Approved', 'Pending', 'Cleared', 'Overdue'], default: 'Pending' },
  attendance: { type: Number, default: 0 },
  achievements: { type: [String], default: [] },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
