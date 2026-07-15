import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  scheduledFor: { type: Date, required: true },
  agenda: { type: [String], default: [] },
  attendance: { type: Number, default: 0 },
  minutes: { type: String, default: '' },
  attachments: { type: [String], default: [] },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema);
