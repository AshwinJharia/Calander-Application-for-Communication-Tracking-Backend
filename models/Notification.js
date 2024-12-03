const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user the notification is for
    required: true,
  },
  type: {
    type: String,
    enum: ['Overdue', 'Due Today'],
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Reference to the company related to the communication
  },
  communication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Communication', // Reference to the communication that triggered the notification
  },
  message: {
    type: String,
    required: true,
  },
});
notificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'company',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('Notification', notificationSchema);
