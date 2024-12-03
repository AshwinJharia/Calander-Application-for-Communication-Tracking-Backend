const express = require('express');
const router = express.Router();
const Communication = require('../models/Commu');

// Get all communication methods

router.get('/', async (req, res) => {
  try {
    const comms = await Communication.find().sort('-date');
    res.status(200).json(comms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch communications' });
  }
});

module.exports = router;
