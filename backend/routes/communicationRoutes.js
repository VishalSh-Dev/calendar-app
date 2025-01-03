import { Router } from 'express';
import Communication from '../backend/models/Communication.js';

const router = Router();

// Get all communications
router.get('/', async (req, res) => {
  try {
    const communications = await Communication.find();
    res.json(communications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new communication
router.post('/', async (req, res) => {
  const communication = new Communication(req.body);
  try {
    const newCommunication = await communication.save();
    res.status(201).json(newCommunication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a communication
router.put('/:id', async (req, res) => {
  try {
    const updatedCommunication = await Communication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCommunication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a communication
router.delete('/:id', async (req, res) => {
  try {
    await Communication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Communication deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

