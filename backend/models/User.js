var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullname: String,
  fatherName: String,
  idNumber: String,
  cardNumber: String,
  birthDate: Object,
  sex: String,
  address: String,
  postCode: String,
  phone: String,
  password: String,
  active: String,
  introductionLetter: String,

  avatar: Number,
  school: String,
  username: String,
  email: String,
  ipAddress: String,
  education: String,
  role: String,
  card: Number,
  acounts: [Object],
  
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
