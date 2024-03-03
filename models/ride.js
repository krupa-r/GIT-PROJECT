const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  assigned: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Ride', rideSchema);