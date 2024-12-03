const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all communication methods
router.get('/', async (req, res) => {
  try {
    const notifs = await Notification.find();
    res.status(200).json(notifs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
