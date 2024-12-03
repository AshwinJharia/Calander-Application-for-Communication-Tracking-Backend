const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the company the communication was with
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommunicationMethod',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
});

communicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'company',
    select: 'name',
  });
  next();
});

communicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'type',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('Communication', communicationSchema);
