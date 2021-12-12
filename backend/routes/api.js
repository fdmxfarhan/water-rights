var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const generateCode = require('../config/generateCode');
const sms = require('../config/sms');
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Acount = require('../models/Acount');
var Notification = require('../models/Notification');
var UserNotif = require('../models/UserNotif');
var Transmission = require('../models/Transmission');
var Settings = require('../models/Settings');

// Saba APIs
router.get('/test', (req, res, next) => {
    var {name} = req.query;
    res.send(`hello ${name}`);
});
router.get('/GetCustomerCreditStatus', (req, res, next) => {
    var {WaterNo, cityCode} = req.query;
    Acount.findOne({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, (err, account) => {
        if(account){
            res.send([
                {
                    id: account._id,
                    WaterNo: WaterNo,
                    CreditStartDate: `${account.startDate.year}/${account.startDate.month}/${account.startDate.day}`,
                    CreditEndDate: `${account.endDate.year}/${account.endDate.month}/${account.endDate.day}`,
                    Volume: account.charge,
                    Type: 1,
                },
                // {
                //     id: account._id,
                //     WaterNo: WaterNo,
                //     CreditStartDate: `${account.startDate.year}/${account.startDate.month}/${account.startDate.day}`,
                //     CreditEndDate: `${account.endDate.year}/${account.endDate.month}/${account.endDate.day}`,
                //     Volume: account.charge,
                //     Type: 2,
                // },
                // {
                //     id: account._id,
                //     WaterNo: WaterNo,
                //     CreditStartDate: `${account.startDate.year}/${account.startDate.month}/${account.startDate.day}`,
                //     CreditEndDate: `${account.endDate.year}/${account.endDate.month}/${account.endDate.day}`,
                //     Volume: account.charge,
                //     Type: 3,
                // },
            ]);
        }
        else res.send('no account was found');
    });
});
router.get('/ReportCurrentCredit', (req, res, next) => {
    var {WaterNo, cityCode, Volume, CreditEndDate} = req.query;
    console.log({WaterNo, cityCode, Volume, CreditEndDate})
    Acount.findOne({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, (err, account) => {
        Acount.updateMany({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, {$set: {charge: parseFloat(Volume)}}, (err, doc) => {
            if(err){
                console.log(err);
                res.send({
                    error: err,
                    status: 'error',
                });
            }else{
                res.send({
                    status: 'ok',
                });
            }
        })
    });
});
router.get('/ReportUsedCredit', (req, res, next) => {
    var {WaterNo, cityCode, reportUsedCredit} = req.query;
    Acount.findOne({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, (err, account) => {
        Acount.updateMany({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, {$set: {usedCharge: parseFloat(reportUsedCredit)}}, (err, doc) => {
            account.usedCharge = parseFloat(reportUsedCredit);
            if(err){
                console.log(err);
                res.send({
                    error: err,
                    status: 'error',
                });
            }else{
                res.send({
                    status: 'ok',
                    id: account._id,
                    WaterNo: WaterNo,
                    CreditStartDate: `${account.startDate.year}/${account.startDate.month}/${account.startDate.day}`,
                    CreditEndDate: `${account.endDate.year}/${account.endDate.month}/${account.endDate.day}`,
                    Volume: account.usedCharge,
                    Type: 1,
                });
            }
        })
    });
});
router.get('/GetNextYearAnnualCredit', (req, res, next) => {
    var {WaterNo, cityCode} = req.query;
    Acount.findOne({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, (err, account) => {
        account.startDate.year += 1;
        account.endDate.year += 1;
        Acount.updateMany({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, {$set: {
            startDate: account.startDate, 
            endDate: account.endDate
        }}, (err, doc) => {
            if(err){
                console.log(err);
                res.send({
                    error: err,
                    status: 'error',
                });
            }else{
                res.send({
                    status: 'ok',
                });
            }
        })
    });
});
router.get('/RevocationOfWellLicense', (req, res, next) => {
    var {WaterNo, cityCode} = req.query;
    Acount.findOne({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, (err, account) => {
        Acount.updateMany({$or:[ {accountNumber: parseInt(WaterNo)}, {license: WaterNo}]}, {$set: {
            blocked: true,
            revoked: true,
        }}, (err, doc) => {
            if(err){
                console.log(err);
                res.send({
                    error: err,
                    status: 'error',
                });
            }else{
                res.send({
                    status: 'ok',
                });
            }
        })
    });
});


// Mobile Application APIs
router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    User.findOne({$or: [{idNumber: username},{phone: username}]}, (err, user) => {
        if(!user){
            res.send({msg: 'نام کاربری یافت نشد.', correct: false});
        }else{
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch) res.send({msg: 'خوش آمدید', correct: true, user: user});
                else res.send({msg: 'رمز عبور اشتباه میباشد!', correct: false});
            });
        }
    });
});
router.post('/phone-login', (req, res, next) => {
    const {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        if(!user){
            res.send({msg: 'نام کاربری یافت نشد.', correct: false});
        }else{
            res.send({msg: 'خوش آمدید', correct: true, user: user});
        }
    });
});
router.post('/sendsms', (req, res, next) => {
    const {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        smsCode = generateCode(4);
        sms(phone, `رمز عبور یکبار مصرف شما: ${smsCode} \n میراب`);
        console.log(smsCode);
        if(user){
            User.updateMany({phone: phone}, {$set: {smsCode: smsCode}}, (err, doc) => {
                res.send({
                    smsSent: true,
                    userExist: true,
                });
            })
        }
        else{
            var newUser = new User({phone, smsCode, role: 'user'});
            newUser.save().then(user => {
                res.send({
                    smsSent: true,
                    userExist: false,
                    confirmed: false,
                    selfRegister: true,
                    passwordSet: false,
                });
            }).catch(err => {if(err) console.log(err)})
        }
    });
});
router.post('/check-code', (req, res, next) => {
    const {phone, smsCode} = req.body;
    console.log(req.body)
    User.findOne({phone: phone}, (err, user) => {
        if(user.smsCode.toString() == smsCode.toString()){
            res.send({correct: true, user})
        }
        else{
            res.send({correct: false})
        }
    })
});
router.post('/compelete-reg', (req, res, next) => {
    const {firstName, lastName, idNumber, cardNumber, fatherName, job, sex, phone} = req.body;
    console.log(req.body)
    User.updateMany({phone: phone}, {$set: {passwordSet: false, selfRegister: true, confirmed: false, firstName, lastName, idNumber, cardNumber, fatherName, job, sex, fullname: firstName + ' ' + lastName}}, (err) => {
        if(err) console.log(err);
        User.findOne({phone: phone}, (err, user) => {
            var newNotif = new Notification({
                type: 'new-user',
                text: `کاربر جدید ${firstName + ' ' + lastName} در اپلیکیشن ثبت نام کرد.`,
                link: user._id.toString(),
                date: new Date,
            })
            newNotif.save().then(doc => {
                res.send({correct: true, user});
            }).catch(err => console.log(err));
        })
    })
});
router.post('/get-accounts', (req, res, next) => {
    const {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        Acount.find({ownerID: user._id, blocked: false}, (err, accounts) => {
            var abvandi = accounts.filter(e => e.type == 'abvandi');
            var chahvandi = accounts.filter(e => e.type == 'chahvandi');
            var chah = accounts.filter(e => e.type == 'chah');
            res.send({abvandi, chahvandi, chah});
        });
    });
});
router.post('/get-all-accounts', (req, res, next) => {
    Acount.find({blocked: false}, (err, accounts) => {
        var abvandi = accounts.filter(e => e.type == 'abvandi');
        var chahvandi = accounts.filter(e => e.type == 'chahvandi');
        var chah = accounts.filter(e => e.type == 'chah');
        res.send({abvandi, chahvandi, chah});
    });
});
router.post('/add-account', (req, res, next) => {
    const {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        Acount.find({}, (err, accounts) => {
            Settings.findOne({}, (err, settings) => {
                var accountNumber = 114110;
                for(var i=0; i<accounts.length; i++)
                    if(accounts[i].accountNumber > accountNumber)
                        accountNumber = accounts[i].accountNumber
                var newAccount = new Acount({
                    accountNumber: accountNumber+1,
                    charge: 0,
                    owner: user.fullname,
                    ownerID: user._id,
                    type: 'abvandi',
                    endDate: settings.endYearDateJ,
                    startDate: settings.startYearDateJ,
                    creationDate: new Date,
                });
                newAccount.save().then(doc => {
                    res.send({done: true, newAccount});
                }).catch(err => {
                    if(err) console.log(err);
                    res.send({done: false});
                });
            })
        })
    });
});
router.post('/add-notification', (req, res, next) => {
    const {type, text, link} = req.body;
    var newNotif = new Notification({
        type,
        text,
        link,
        date: new Date,
    });
    newNotif.save().then(doc => {
        res.send({done: true})
    }).catch(err => {
        if(err) {
            console.log(err);
            res.send({done: false});
        }
    });
});
router.post('/add-transmission', (req, res, next) => {
    var {source, target, amount} = req.body;
    var newTransmission = new Transmission({
        source,
        target,
        amount,
        date: new Date,
    });
    newTransmission.save().then(doc =>{
        Acount.updateMany({_id: source._id}, {$set: {charge: source.charge - amount}}, (err) => {
            res.send({done: true})
        });
    }).catch(err => console.log(err));
});
router.post('/get-transmissions', (req, res, next) => {
    var {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        Transmission.find({}, (err, allTransmissions) => {
            var transmissions = [];
            for(var i=0; i<allTransmissions.length; i++){
                if(allTransmissions[i].source.ownerID.toString() == user._id.toString() || allTransmissions[i].target.ownerID.toString() == user._id.toString()){
                    transmissions.push(allTransmissions[i]);
                }
            }
            res.send({done: true, transmissions});
        });
    });
});
router.post('/change-password', (req, res, next) => {
    var {phone, oldPassword, password, passwordConf} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        if(user.passwordSet){
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(isMatch){
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                        User.updateMany({_id: user._id}, {$set: {password: hash}}, (err, doc) => {
                            res.send({done: true});
                        });
                    }));
                }
                else{
                    res.send({done: false, msg: 'رمز عبور قبلی صحیح نمیباشد.'})
                }
            });
        }
        else{
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                User.updateMany({_id: user._id}, {$set: {password: hash, passwordSet: true}}, (err, doc) => {
                    res.send({done: true});
                });
            }));
        }
        
    });
});
router.post('/get-notifications', (req, res, next) => {
    var {userID, phone} = req.body;
    UserNotif.find({userID: userID}, (err, notifications) => {
        res.send(notifications);
    });
});
router.post('/seen-notifications', (req, res, next) => {
    var {userID, phone} = req.body;
    UserNotif.updateMany({userID: userID}, {$set: {seen: true}}, (err, notifications) => {
        res.send({done: true});
    });
});




module.exports = router;
