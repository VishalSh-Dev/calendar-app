import mongoose from 'mongoose';

const communicationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  notes: String,
});

const Communication = mongoose.model('Communication', communicationSchema);
export default Communication;

