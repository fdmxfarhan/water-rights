var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
const bcrypt = require('bcryptjs');
const mail = require('../config/mail');
const passport = require('passport');

User.findOne({role: 'admin'}, (err, user) => {
    if(!user){
        const newUser = new User({
            fullname: 'ادمین', 
            firstName: 'ادمین', 
            lastName: '', 
            idNumber: 'admin', 
            cardNumber: '1234', 
            phone: '1234',
            password: 'admin1234',
            role: 'admin', 
            card: 0
        });
        // Hash password
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) console.log(err);
            newUser.password = hash;
            newUser.save().then(user => {
                console.log('Admin Account Generated :)');
                console.log('\tusername: admin');
                console.log('\tpassword: admin1234');
            }).catch(err => console.log(err));
        }));
    }
})
router.get('/register', (req, res, next) => {
    if(req.user)
        res.redirect('/dashboard');
    else
        res.render('register');
});
router.get('/login', (req, res, next) => {
    if(req.user)
        res.redirect('/dashboard');
    else
        res.render('login');
});
router.post('/register', (req, res, next) => {
    // const { firstName, lastName, address, phone, school, idNumber, password, configpassword } = req.body;
    const {firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, password, configpassword} = req.body;
    const role = 'user', card = 0;
    const ipAddress = req.connection.remoteAddress;
    let errors = [];
    /// check required
    if(!firstName || !lastName || !idNumber || !cardNumber || !birthDay || !birthMonth || !birthYear || !sex || !fatherName || !address || !postCode || !phone || !password || !configpassword){
        errors.push({msg: 'لطفا موارد خواسته شده را کامل کنید!'});
    }
    /// check password match
    if(password !== configpassword){
        errors.push({msg: 'تایید رمز عبور صحیح نمیباشد!'});
    }
    /// check password length
    if(password.length < 4){
        errors.push({msg: 'رمز عبور شما بسیار ضعیف میباشد!'});
    }
    ///////////send evreything 
    if(errors.length > 0 ){
        res.render('register', { firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, errors});
    }
    else{
        const fullname = firstName + ' ' + lastName;
        // validation passed
        User.findOne({ idNumber: idNumber})
            .then(user =>{
            if(user){
                // user exist
                errors.push({msg: 'کد ملی قبلا ثبت شده است.'});
                res.render('register', { firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, errors });
            }
            else {
                const newUser = new User({ipAddress, fullname, firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, password, role, card});
                // Hash password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) console.log(err);
                    newUser.password = hash;
                    newUser.save().then(user => {
                        req.flash('success_msg', 'ثبت نام با موفقیت انجام شد. اکنون میتوانید وارد شوید.');
                        res.redirect('/users/login');
                    }).catch(err => console.log(err));
                }));
                console.log(newUser);
            }
        });
    }  
});
router.post('/login', function(req, res, next){
    const { username, password} = req.body;
    let errors = [];
    /// check required
    if(!username || !password){
      errors.push({msg: 'لطفا موارد خواسته شده را کامل کنید!'});
    }
    if(errors.length > 0 ){
      res.render('login', { errors, username, password});
    }
    passport.authenticate('local', {
      successRedirect: '/dashboard?login=true',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
});
// Logout handle
router.get('/logout', function(req, res, next){
    req.logOut();
    req.flash('success_msg', 'شما با موفقیت خارج شدید');
    res.redirect('/users/login');
});

module.exports = router;
