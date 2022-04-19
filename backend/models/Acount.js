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
  nextCharge: {
    type: Number,
    default: 0,
  },
  yearCharge: {
    type: Number,
    default: 0,
  },
  
  endDate: Object,
  startDate: Object,
  nextEndDate: Object,
  nextStartDate: Object,
  yearEndDate: Object,
  yearStartDate: Object,
  
  creationDate: Date,
  linkedAccount: String,

  sandogh: {type: Number, default: 0},
  blocked: {type: Boolean, default: false},
  usedCharge: {type: Number, default: 0},
  creditType: {type: Number, default: 1},
  revoked: {type: Boolean, default: false},
  lastYearCharge: {type: Number, default: 0},
  nextYearCharge: {type: Number, default: 0},
  reportUsedCredit: {
    type: Object
  },
  currentCredit: [Object],
  usedCredit: {type: Number, default: 0},
  leftCredit: {type: Number, default: 0},
  soldCredit: {type: Number, default: 0},
  boughtCredit: {type: Number, default: 0},
  licenseConfirmed: {type: Boolean, default: false},
  counterConfirmed: {type: Boolean, default: false},
  calibrateIssued: {type: Boolean, default: false},
  counterCalibrateConfirmed: {type: Boolean, default: false},
  calibrateLicense: {type: Object, default: {link: '', type: 'undefined'}},
  counterDamageCharge: {type: Number, default: 0},
  counterChangeCharge: {type: Number, default: 0},
  extendedCharge: {type: Number, default: 0},
  otherCharge: {type: Number, default: 0},
});

var Acount = mongoose.model('Acount', AcountSchema);

module.exports = Acount;


