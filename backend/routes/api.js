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
var Transmission = require('../models/Transmission');

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
    User.updateMany({phone: phone}, {$set: {firstName, lastName, idNumber, cardNumber, fatherName, job, sex, fullname: firstName + ' ' + lastName}}, (err) => {
        if(err) console.log(err);
        User.findOne({phone: phone}, (err, user) => {
            res.send({correct: true, user});
        })
    })
});
router.post('/get-accounts', (req, res, next) => {
    const {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        Acount.find({ownerID: user._id}, (err, accounts) => {
            var abvandi = accounts.filter(e => e.type == 'abvandi');
            var chahvandi = accounts.filter(e => e.type == 'chahvandi');
            var chah = accounts.filter(e => e.type == 'chah');
            res.send({abvandi, chahvandi, chah});
        });
    });
});
router.post('/add-account', (req, res, next) => {
    const {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        Acount.find({}, (err, accounts) => {
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
                endDate: {year: 1400, month: 10, day: 4},
                startDate: {year: 1400, month: 10, day: 4},
                creationDate: new Date,
            });
            newAccount.save().then(doc => {
                res.send({done: true, newAccount});
            }).catch(err => {
                if(err) console.log(err);
                res.send({done: false});
            });
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
        res.send({done: true})
    }).catch(err => console.log(err));
})
module.exports = router;
