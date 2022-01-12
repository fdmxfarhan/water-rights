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
const sms = require('../config/sms');
const sms2 = require('../config/sms2');
const mail = require('../config/mail');
const dateConvert = require('../config/dateConvert');
var bodyparser = require('body-parser');
const multer = require('multer');
const mkdirp = require('mkdirp');

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
                            res.render('./kargozar/dashboard', {
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
    //     res.render('./kargozar/dashboard', {
    //         user: req.user,
    //         users,
            
    //     });
    // });
});
router.post('/add-chah-account', ensureAuthenticated, upload.single('licensePic'), (req, res, next) => {
    var {userID, owner, userIndex, license, permitedUseInYear, permitedAbdehi, permitedWorkTime, UTM, useType, pomp, wellCap, sellCap, buyCap, depth, power, abdehi, farmingType, area} = req.body;
    var file = req.file;
    Settings.findOne({}, (err, settings) => {
        Acount.findOne({license: license}, (err, acount) => {
            if(acount){
                req.flash('error_msg', 'شماره پروانه قبلا ثبت شده');
                res.redirect(`/kargozar?userIndex=${userIndex}`);
            }else{
                User.findById(userID, (err, user) => {
                    var licensePic = file.destination.slice(6) + '/' + file.originalname;
                    var newAcount = new Acount({
                        permitedAbdehi, permitedWorkTime, UTM, useType, pomp, wellCap, sellCap, buyCap, depth, power, abdehi, farmingType, area,
                        license,
                        licensePic,
                        owner: owner,
                        ownerID: userID,
                        permitedUseInYear,
                        type: 'chah',
                        charge: permitedUseInYear,
                        sellCap: permitedUseInYear*0.1,
                        nextCharge: permitedUseInYear,
                        yearCharge: permitedUseInYear,
                        endDate: settings.endYearDateJ,
                        startDate: settings.startYearDateJ,
                    });
                    newAcount.save().then(doc => {
                        Acount.find({}, (err, accounts) => {
                            var accountNumber = 114110;
                            for(var i=0; i<accounts.length; i++)
                                if(accounts[i].accountNumber > accountNumber)
                                    accountNumber = accounts[i].accountNumber
                            var newAcount2 = new Acount({
                                accountNumber: accountNumber+1,
                                charge: 0,
                                owner: user.fullname,
                                ownerID: user._id,
                                type: 'chahvandi',
                                creationDate: new Date,
                                linkedAccount: newAcount._id,
                                endDate: settings.endYearDateJ,
                                startDate: settings.startYearDateJ,
                            });
                            newAcount2.save().then(doc => {
                                User.updateMany({_id: userID}, {$set: {chahvand: true, regStatusNum: user.regStatusNum+1}}, (err, doc) => {
                                    sms(user.phone, 'حساب چاه شما در سامانه میراب ثبت شد\nمیراب');
                                    var newAdminNotif = new AdminNotif({
                                        target: 'آب منطقه‌ای',
                                        type: 'state-0',
                                        text: `درخواست ورود به بازار ${user.fullname} توسط کارشناس کارگزار ثبت شد. جهت بررسی و تایید وضعیت شارژ و اعتبار کلیک کنید.`,
                                        date: new Date(),
                                        userID: userID,
                                    });
                                    newAdminNotif.save().then(doc => {
                                        req.flash('success_msg', 'حساب چاه با موفقیت ایجاد شد');
                                        res.redirect(`/kargozar?userIndex=${userIndex}`);
                                    }).catch(err => console.log(err));
                                })
                            });
                        });
                    }).catch(err => console.log(err));
                });
            }
        })
    })
});
router.post('/commitment', ensureAuthenticated, upload.single('commitmentLetter'), (req, res, next) => {
    var {userID, owner, userIndex, comment} = req.body;
    var file = req.file;
    var commitmentLetter = '';
    if(file) commitmentLetter = file.destination.slice(6) + '/' + file.originalname;
    User.findById(userID, (err, user) => {
        AdminNotif.updateMany({userID: userID}, {$set: {seen: true}}, (err, doc) => {
            User.updateMany({_id: userID}, {$set: {comment4: comment, regStatusNum: user.regStatusNum+1, commitmentLetter, confirmed: true}}, (err) => {
                sms(user.phone, 'فرایند ورود به بازار آب تکمیل شد. \nمیراب')
                req.flash('success_msg', 'حساب چاه با موفقیت ایجاد شد');
                res.redirect(`/kargozar?userIndex=${userIndex}`);
            });
        });
    });
});


module.exports = router;

