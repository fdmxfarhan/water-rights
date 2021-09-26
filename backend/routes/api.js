var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const generateCode = require('../config/generateCode');
const sms = require('../config/sms');
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    User.findOne({idNumber: username}, (err, user) => {
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

router.post('/sendsms', (req, res, next) => {
    const {phone} = req.body;
    User.findOne({phone: phone}, (err, user) => {
        smsCode = generateCode(4);
        // sms(phone, `رمز عبور یکبار مصرف شما: ${smsCode} \n میراب`);
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
            var newUser = new User({phone, smsCode});
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
            res.send({correct: true})
        }
        else{
            res.send({correct: false})
        }
    })

})

module.exports = router;
