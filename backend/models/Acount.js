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
});

var Acount = mongoose.model('Acount', AcountSchema);

module.exports = Acount;


