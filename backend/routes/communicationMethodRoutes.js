import { Router } from 'express';
import CommunicationMethod from '../models/CommunicationMethod.js';

const router = Router();

// Get all communication methods
router.get('/', async (req, res) => {
  try {
    const methods = await CommunicationMethod.find();
    res.json(methods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new communication method
router.post('/', async (req, res) => {
  const method = new CommunicationMethod(req.body);
  try {
    const newMethod = await method.save();
    res.status(201).json(newMethod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a communication method
router.put('/:id', async (req, res) => {
  try {
    const updatedMethod = await CommunicationMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMethod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a communication method
router.delete('/:id', async (req, res) => {
  try {
    await CommunicationMethod.findByIdAndDelete(req.params.id);
    res.json({ message: 'Communication method deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

