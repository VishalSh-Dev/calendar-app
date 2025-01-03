import mongoose from 'mongoose';

const communicationMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  sequence: { type: Number, required: true },
  mandatory: { type: Boolean, default: false },
});

const CommunicationMethod = mongoose.model('CommunicationMethod', communicationMethodSchema);
export default CommunicationMethod;

