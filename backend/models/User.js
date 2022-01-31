var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullname: String,
  fatherName: String,
  idNumber: String,
  cardNumber: String,
  birthDate: {
    type: Object,
    default: {year: '', month: '', day: ''},
  },
  sex: String,
  address: String,
  postCode: String,
  phone: String,
  password: String,
  active: String,
  introductionLetter: String,
  file: {
    type: [Object],
    default: [],
  },
  job: String,

  avatar: Number,
  school: String,
  username: String,
  email: String,
  ipAddress: String,
  education: String,
  role: {
    type: String,
    default: 'user',
  },
  card: Number,
  acounts: [Object],
  
  smsCode: Object,
  accountRole: {
    type: String,
    default: 'آب‌وند',
  },
  tempPassword: {
    type: Boolean,
    default: false,
  },
  chahvand:{
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: true,
  },
  selfRegister: {
    type: Boolean,
    default: false,
  },
  passwordSet: {
    type: Boolean,
    default: true,
  },
  regStatus: {
    type: String,
    default: 'ثبت درخواست',
  },
  regStatusNum: {
    type: Number,
    default: 0,
  },
  regCompelete: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: [Object],
    default: [],
  },
  failedCredit: {type: Boolean, default: false},
  comment0: {type: String, default: ''},
  comments: {type: [Object], default: []},
  comment1: {type: String, default: ''},
  comment2: {type: String, default: ''},
  comment3: {type: String, default: ''},
  comment4: {type: String, default: ''},
  tashakolComment: {type: String, default: ''},
  file0: {type: Object, default: {link: '', type: 'undefined'}},
  file1: {type: Object, default: {link: '', type: 'undefined'}},
  file2: {type: Object, default: {link: '', type: 'undefined'}},
  file3: {type: Object, default: {link: '', type: 'undefined'}},
  file4: {type: Object, default: {link: '', type: 'undefined'}},
  counterNotCalibrated: {type: Boolean, default: false},
  commitmentLetter: String,
  marketRole: {type: String, default: ''},
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
