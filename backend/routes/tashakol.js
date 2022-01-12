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
const mail = require('../config/mail');
const dateConvert = require('../config/dateConvert');
var AdminNotif = require('../models/AdminNotif');
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
                            res.render('./tashakol/dashboard', {
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
router.post('/calibrate', ensureAuthenticated, upload.fields([{name: `calibrateLicense`, maxCount: 1}]),(req, res, next) => {
    var {userID, owner, userIndex, chahID, comment, calibrateIssued, counterCalibrateConfirmed, confirm} = req.body;
    if(!calibrateIssued) calibrateIssued = false;
    else calibrateIssued = true;
    if(!counterCalibrateConfirmed) counterCalibrateConfirmed = false;
    else counterCalibrateConfirmed = true;
    var file = req.body.calibrateLicense
    var calibrateLicense = '';
    var type = 'undefined';
    if(file) {
        calibrateLicense = file.destination.slice(6) + '/' + file.originalname;
        type = file.mimetype.split('/')[0];
    }
    User.findById(userID, (err, user) => {
        Acount.updateMany({_id: chahID}, {$set: {calibrateIssued, counterCalibrateConfirmed, calibrateLicense: {link: calibrateLicense, type}}}, (err) => {
            if(err) console.log(err);
            if(calibrateIssued && counterCalibrateConfirmed){
                User.updateMany({_id: userID}, {$set: {tashakolComment: comment, counterNotCalibrated: false}}, (err) => {
                    if(err) console.log(err);
                    AdminNotif.updateMany({$or: [{target: 'تشکل آب بران', type: 'state-2', userID: userID}]}, {$set: {seen: true}}, (err, doc) => {
                        if(err) console.log(err);
                        var newAdminNotif = new AdminNotif({
                            target: 'آب منطقه‌ای',
                            type: 'state-2',
                            text: `گواهی صحت عملکرد کنتور برای ${user.fullname} توسط کارشناس تشکل آب بران تایید شد. نظر کارشناس: ${comment}`,
                            date: new Date(),
                            userID: userID,
                        });
                        newAdminNotif.save().then(doc => {
                            req.flash('success_msg', 'اطلاعات ثبت شد.');
                            res.redirect(`/tashakol?userIndex=${userIndex}`);
                        }).catch(err => console.log(err));
                    });
                })
            }
            else{
                User.updateMany({_id: userID}, {$set: {tashakolComment: comment}}, (err) => {
                    if(calibrateIssued)
                        sms(user.phone, 'درخواست کالیبراسیون برای کنتور آب شما صادر شد. \nمیراب');
                    if(err) console.log(err);
                    req.flash('success_msg', 'اطلاعات ثبت شد.');
                    res.redirect(`/tashakol?userIndex=${userIndex}`);
                });
            }
        });
    });
});

module.exports = router;

