import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import companyRoutes from '../routes/companyRoutes.js';
import communicationMethodRoutes from '../routes/communicationMethodRoutes.js';
import communicationRoutes from '../routes/communicationRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const uri = process.env.MONGODB_URI;

// Middleware
app.use(cors({
  origin: true, 
}));
app.use(json());

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    initializeDefaultMethods();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/companies', companyRoutes);
app.use('/api/communication-methods', communicationMethodRoutes);
app.use('/api/communications', communicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function initializeDefaultMethods() {
  const defaultMethods = [
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: false },
    { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: false },
    { name: 'Email', description: 'Send an email', sequence: 3, mandatory: false },
    { name: 'Phone Call', description: 'Make a phone call', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other communication method', sequence: 5, mandatory: false },
  ];

  const CommunicationMethod = mongoose.models.CommunicationMethod || mongoose.model('CommunicationMethod', new mongoose.Schema({
    name: String,
    description: String,
    sequence: Number,
    mandatory: Boolean,
  }));

  for (const method of defaultMethods) {
    await CommunicationMethod.findOneAndUpdate(
      { name: method.name },
      method,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log('Default communication methods initialized');
}

