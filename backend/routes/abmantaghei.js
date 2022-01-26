var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Acount = require('../models/Acount');
var Notification = require('../models/Notification');
var UserNotif = require('../models/UserNotif');
var Transmission = require('../models/Transmission');
var Settings = require('../models/Settings');
var AdminNotif = require('../models/AdminNotif');
const mail = require('../config/mail');
const dateConvert = require('../config/dateConvert');
var bodyparser = require('body-parser');
const multer = require('multer');
const mkdirp = require('mkdirp');
const sms = require('../config/sms');
const sms2 = require('../config/sms2');

router.use(bodyparser.urlencoded({ extended: true }));
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = 'public/files/' + Date.now().toString();
        mkdirp(dir, err => cb(err, dir));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.get('/', ensureAuthenticated, (req, res, next) => {
    User.find({}, (err, users) => {
        Acount.find({}, (err, accounts) => {
            Acount.findOne({type: 'mirab'}, (err, mirab) => {
                Acount.findOne({type: 'abkhan'}, (err, abkhan) => {
                    AdminNotif.find({}, (err, notifications) => {
                        Transmission.find({done: false}, (err, transmissions) => {
                            var sumCharge = 0;
                            if(accounts.length > 1)
                                sumCharge = accounts.map(e => parseInt(e.charge)).reduce((a, b) => a+b);
                            res.render('./abmantaghei/dashboard', {
                                user: req.user,
                                login: req.query.login,
                                notifications,
                                dateConvert,
                                transmissions,
                                users,
                                accounts,
                                sumCharge,
                                mirab,
                                abkhan,
                                userIndex: req.query.userIndex,
                                smsIndex: req.query.smsIndex,
                            });
                        })
                    })
                    Notification.updateMany({seen: false}, {$set: {seen: true}}, (err, notifications) => {
                        if(err) console.log(err)
                    });
                })
            })
        });
    })
    // User.find({role: 'user'}, (err, users) => {
    //     res.render('./abmantaghei/dashboard', {
    //         user: req.user,
    //         users,
            
    //     });
    // });
});
router.post('/confirm-charge', ensureAuthenticated, (req, res, next) => {
    var {userID, owner, userIndex, chahID, comment, permitedUseInYear, usedCredit, leftCredit, confirm} = req.body;
    console.log(req.body);
    if(confirm == 'true'){
        Acount.updateMany({_id: chahID}, {$set: {permitedUseInYear, usedCredit, leftCredit}}, (err, doc) => {
            User.findById(userID, (err, user) => {
                User.updateMany({_id: userID}, {$set: {comment1: comment, regStatusNum: user.regStatusNum+1}}, (err, doc) => {
                    AdminNotif.updateMany({$or: [{target: 'آب منطقه‌ای', type: 'state-0', userID: userID}, {target: 'کارگزار', type: 'state-1', userID: userID}]}, {$set: {seen: true}}, (err, doc) => {
                        if(err) console.log(err);
                        var newAdminNotif = new AdminNotif({
                            target: 'کارگزار',
                            type: 'state-1',
                            text: `وضعیت شارژ و اعتبار بهره‌برداران حساب ${user.fullname} توسط کارشناس آب منطقه‌ای تایید شد.`,
                            date: new Date(),
                            userID: userID,
                        });
                        newAdminNotif.save().then(doc => {
                            req.flash('success_msg', 'وضعیت شارژ تایید شد.');
                            res.redirect(`/abmantaghei?userIndex=${userIndex}`);
                        }).catch(err => console.log(err));
                    });
                });
            });
        });
    }
    else{
        Acount.updateMany({_id: chahID}, {$set: {permitedUseInYear, usedCredit, leftCredit}}, (err, doc) => {
            User.findById(userID, (err, user) => {
                User.updateMany({_id: userID}, {$set: {comment1: comment, failedCredit: true}}, (err, doc) => {
                    AdminNotif.updateMany({$or: [{target: 'آب منطقه‌ای', type: 'state-0', userID: userID}, {target: 'کارگزار', type: 'state-1', userID: userID}]}, {$set: {seen: true}}, (err, doc) => {
                        if(err) console.log(err);
                        var newAdminNotif = new AdminNotif({
                            target: 'کارگزار',
                            type: 'state-1',
                            text: `وضعیت شارژ و اعتبار بهره‌برداران حساب ${user.fullname} توسط کارشناس آب منطقه‌ای رد شد. نظر کارشناس: ${comment}\n`,
                            date: new Date(),
                            userID: userID,
                        });
                        newAdminNotif.save().then(doc => {
                            req.flash('success_msg', 'به کارگزار اطلاع داده شد.');
                            res.redirect(`/abmantaghei?userIndex=${userIndex}`);
                        }).catch(err => console.log(err));
                    });
                });
            });
        });
    }
});
router.post('/confirm-technical', ensureAuthenticated, upload.single(`document`),(req, res, next) => {
    var {userID, owner, userIndex, chahID, comment, licenseConfirmed, counterConfirmed, confirm} = req.body;
    if(!licenseConfirmed) licenseConfirmed = false;
    else                  licenseConfirmed = true;
    if(!counterConfirmed) counterConfirmed = false;
    else                  counterConfirmed = true;
    var file = req.file;
    var document = '';
    var type = 'undefined';
    if(file) {
        document = file.destination.slice(6) + '/' + file.originalname;
        type = file.mimetype.split('/')[0];
    }
    User.findById(userID, (err, user) => {
        Acount.updateMany({_id: chahID}, {$set: {licenseConfirmed, counterConfirmed}}, (err) => {
            if(err) console.log(err);
            if(licenseConfirmed && counterConfirmed){
                User.updateMany({_id: userID}, {$set: {comment2: comment, regStatusNum: user.regStatusNum+1, file2: {link: document, type}}}, (err) => {
                    if(err) console.log(err);
                    AdminNotif.updateMany({$or: [{target: 'کارگزار', type: 'state-1', userID: userID}, {target: 'تشکل آب بران', type: 'state-2', userID: userID}]}, {$set: {seen: true}}, (err, doc) => {
                        if(err) console.log(err);
                        var newAdminNotif = new AdminNotif({
                            target: 'کارگزار',
                            type: 'state-2',
                            text: `وضعیت فنی پرونه چاه ${user.fullname} توسط کارشناس آب منطقه‌ای تایید شد.`,
                            date: new Date(),
                            userID: userID,
                        });
                        newAdminNotif.save().then(doc => {
                            req.flash('success_msg', 'اطلاعات ثبت شد.');
                            res.redirect(`/abmantaghei?userIndex=${userIndex}`);
                        }).catch(err => console.log(err));
                    });
                })
            }
            else if(!counterConfirmed){
                User.updateMany({_id: userID}, {$set: {comment2: comment, counterNotCalibrated: true}}, (err) => {
                    AdminNotif.updateMany({$or: [{target: 'کارگزار', type: 'state-1', userID: userID}]}, {$set: {seen: true}}, (err, doc) => {
                        if(err) console.log(err);
                        var newAdminNotif = new AdminNotif({
                            target: 'تشکل آب بران',
                            type: 'state-2',
                            text: `حساب چاه ${user.fullname} در انتظار صدور درخواست کالیبراسیون کنتور است.`,
                            date: new Date(),
                            userID: userID,
                        });
                        newAdminNotif.save().then(doc => {
                            req.flash('success_msg', 'اطلاعات ثبت شد.');
                            res.redirect(`/abmantaghei?userIndex=${userIndex}`);
                        }).catch(err => console.log(err));
                    });
                });
            }
        });
    });
    
});
router.post('/change-doc', ensureAuthenticated, upload.fields([{name: `newLicensePic`, maxCount: 1}, {name: `document`, maxCount: 1}]),(req, res, next) => {
    var {userID, owner, userIndex, chahID, comment, confirm} = req.body;
    var file1 = req.body.newLicensePic;
    var file2 = req.body.document;
    Acount.findById(chahID, (err, chah) => {
        var newLicensePic = chah.licensePic;
        var type1 = 'undefined';
        if(file1) {
            newLicensePic = file1.destination.slice(6) + '/' + file1.originalname;
            type1 = file1.mimetype.split('/')[0];
        }
        var document = '';
        var type2 = 'undefined';
        if(file2) {
            document = file2.destination.slice(6) + '/' + file2.originalname;
            type2 = file2.mimetype.split('/')[0];
        }
        
        User.findById(userID, (err, user) => {
            Acount.updateMany({_id: chahID}, {$set: {licensePic: newLicensePic}}, (err) => {
                if(err) console.log(err);
                User.updateMany({_id: userID}, {$set: {comment3: comment, regStatusNum: user.regStatusNum+1, file3: {link: document, type: type2}}}, (err) => {
                    if(err) console.log(err);
                    AdminNotif.updateMany({$or: [{target: 'کارگزار', userID: userID}, {target: 'تشکل آب بران', userID: userID}, {target: 'آب منطقه‌ای', userID: userID}]}, {$set: {seen: true}}, (err, doc) => {
                        if(err) console.log(err);
                        var newAdminNotif = new AdminNotif({
                            target: 'کارگزار',
                            type: 'state-3',
                            text: `اصلاح نام پرونده ${user.fullname} توسط کارشناس آب منطقه‌ای تکمیل شد.`,
                            date: new Date(),
                            userID: userID,
                        });
                        newAdminNotif.save().then(doc => {
                            req.flash('success_msg', 'اطلاعات ثبت شد.');
                            res.redirect(`/abmantaghei?userIndex=${userIndex}`);
                        }).catch(err => console.log(err));
                    });
                })
            });
        });
    })
    
});

module.exports = router;

