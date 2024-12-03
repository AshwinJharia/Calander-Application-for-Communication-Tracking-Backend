const express = require('express');
const router = express.Router();
const CommunicationMethod = require('../models/CommuMethod');

// Get all communication methods
router.get('/', async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort('sequence');
    res.status(200).json(methods);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch communication methods' });
  }
});

// Add a new communication method
router.post('/', async (req, res) => {
  const { name, description, sequence, mandatory } = req.body;

  try {
    const method = new CommunicationMethod({ name, description, sequence, mandatory });
    await method.save();
    res.status(201).json(method);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add communication method', details: err });
  }
});

// Update a communication method
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, sequence, mandatory } = req.body;

  try {
    const method = await CommunicationMethod.findByIdAndUpdate(
      id,
      { name, description, sequence, mandatory },
      { new: true, runValidators: true }
    );
    res.json(method);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update communication method', details: err });
  }
});

// Delete a communication method
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await CommunicationMethod.findByIdAndDelete(id);
    res.json({ message: 'Communication method deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete communication method' });
  }
});

module.exports = router;
