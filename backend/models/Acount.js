var mongoose = require('mongoose');

var AcountSchema = new mongoose.Schema({
  type: String, // abvandi, chahvandi, chah
  license: String,
  licensePic: String,
  introductionLetterPic: String,
  permitedAbdehi: Number,
  permitedWorkTime: Number,
  UTM: String,
  useType: String,
  farmingType: String,
  area: Number,
  depth: Number,
  power: Number,
  abdehi: Number,
  pomp: String,
  buyCap: Number,
  sellCap: Number,
  wellCap: Number,
  permitedUseInYear: Number,
  chargeInYear: Number,
  owner: String,
  ownerID: String,
  completedInfo: {type: Boolean, default: false},
  
  accountNumber: Number,
  charge: {
    type: Number,
    default: 0,
  },
  endDate: Object,
  startDate: Object,
  creationDate: Date,
  linkedAccount: String,

  sandogh: {
    type: Number,
    default: 0,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  usedCharge: {
    type: Number,
    default: 0,
  },
  creditType: {
    type: Number,
    default: 1,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  lastYearCharge: {
    type: Number,
    default: 0,
  },
  nextYearCharge: {
    type: Number,
    default: 0,
  },

});

var Acount = mongoose.model('Acount', AcountSchema);

module.exports = Acount;


