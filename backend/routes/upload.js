var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var path = require('path');
var bodyparser = require('body-parser');
const multer = require('multer');
const mkdirp = require('mkdirp');
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Acount = require('../models/Acount');

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

router.post('/admin-register', ensureAuthenticated, upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    if(!file) res.send('no file to upload');
    else{
        var introductionLetter = file.destination.slice(6) + '/' + file.originalname;
        console.log(introductionLetter);
        const {firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, password, configpassword} = req.body;
        const role = 'user', card = 0;
        const ipAddress = req.connection.remoteAddress;
        let errors = [];
        if(password !== configpassword){
            errors.push({msg: 'تایید رمز عبور صحیح نمیباشد!'});
        }
        /// check password length
        if(password.length < 4){
            errors.push({msg: 'رمز عبور شما بسیار ضعیف میباشد!'});
        }
        ///////////send evreything 
        if(errors.length > 0 ){
            User.find({}, (err, users) => {
                res.render('./dashboard/admin-users', { 
                    user: req.user,
                    users,
                    firstName, 
                    lastName, 
                    idNumber, 
                    cardNumber, 
                    birthDay, 
                    birthMonth, 
                    birthYear, 
                    sex, 
                    fatherName, 
                    address, 
                    postCode, 
                    phone, 
                    errors,
                });
            });
        }
        else if(req.user.role == 'admin'){
            const fullname = firstName + ' ' + lastName;
            User.findOne({ idNumber: idNumber}).then(user =>{
                if(user){
                    // user exist
                    errors.push({msg: 'کد ملی قبلا ثبت شده است.'});
                    User.find({}, (err, users) => {
                        res.render('./dashboard/admin-users', { 
                            user: req.user,
                            users,
                            firstName, 
                            lastName, 
                            idNumber, 
                            cardNumber, 
                            birthDay, 
                            birthMonth, 
                            birthYear, 
                            sex, 
                            fatherName, 
                            address, 
                            postCode, 
                            phone, 
                            errors 
                        });
                    });
                }
                else {
                    const newUser = new User({ipAddress, fullname, introductionLetter, firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, password, role, card});
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.log(err);
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg', 'کاربر با موفقیت ثبت شد');
                            res.redirect('/dashboard/users');
                        }).catch(err => console.log(err));
                    }));
                    console.log(newUser);
                }
            });
        }
    }
});

router.post('/user-file', ensureAuthenticated, upload.single('myFile'), (req, res, next) => {
    var {userID, title} = req.body;
    var file = req.file;
    if(!file) res.send('no file to upload');
    else{
        User.findById(userID, (err, user) => {
            var newFile = user.file;
            newFile.push({link: file.destination.slice(6) + '/' + file.originalname, title});
            User.updateMany({_id: userID}, {$set: {file: newFile}}, (err) => {
                if(err) console.log(err);
                res.redirect(`/dashboard/user-view?userID=${userID}`);
            });
        });
    }
});

router.post('/add-chah', ensureAuthenticated, upload.single('myFile'), (req, res, next) => {
    var {userID, license} = req.body;
    var file = req.file;
    if(!file) {
        req.flash('error_msg', 'عکس پروانه بهره برداری را انتخاب نمایید');
        res.redirect(`/dashboard/user-view?userID=${userID}`);
    }
    else{
        Acount.findOne({license: license}, (err, acount) => {
            if(acount){
                req.flash('error_msg', 'شماره پروانه قبلا ثبت شده');
                res.redirect(`/dashboard/user-view?userID=${userID}`)
            }else{
                User.findById(userID, (err, user) => {
                    var licensePic = file.destination.slice(6) + '/' + file.originalname;
                    var newAcount = new Acount({
                        license,
                        licensePic,
                        owner: user.fullname,
                        ownerID: userID,
                        type: 'chah',
                    });
                    newAcount.save().then(doc => {
                        res.redirect(`/dashboard/acount-view?acountID=${newAcount._id}`)
                    }).catch(err => console.log(err));
                });
            }
        })
    }
});




module.exports = router;