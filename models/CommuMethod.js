const mongoose = require('mongoose');

const communicationMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Communication method name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  sequence: {
    type: Number,
    required: [true, 'Sequence is required'],
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('CommunicationMethod', communicationMethodSchema);
