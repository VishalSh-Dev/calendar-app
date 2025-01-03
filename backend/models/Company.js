import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  linkedinProfile: String,
  emails: [String],
  phoneNumbers: [String],
  comments: String,
  communicationPeriodicity: { type: Number, required: true, default: 14 },
});

const Company = mongoose.model('Company', companySchema);
export default Company;

