var mongoose = require('mongoose');

var TransmissionSchema = new mongoose.Schema({
  source: Object,
  target: Object,
  date: Date,
  done: {
    type: Boolean,
    default: false,
  },
  amount: Number,
  accepted: {
    type: Boolean,
    default: false,
  },
  form3: {type: String, default: ''},
});

var Transmission = mongoose.model('Transmission', TransmissionSchema);

module.exports = Transmission;


