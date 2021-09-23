var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Acount = require('../models/Acount');
const mail = require('../config/mail');


router.get('/', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'user')
    {
        res.render('./dashboard/user-dashboard', {
            user: req.user,
            login: req.query.login
        });
    }
    else if(req.user.role = 'admin')
    {
        res.render('./dashboard/admin-dashboard', {
            user: req.user,
            login: req.query.login,
        });
    }
});

router.get('/users', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        User.find({}, (err, users) => {
            res.render('./dashboard/admin-users', {
                user: req.user,
                users,
            });
        })
    }
    else res.send('Access Denied');
});


router.get('/delete-user', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        User.deleteOne({_id: req.query.userID}, (err) => {
            req.flash('success_msg', 'کاربر با موفقیت حذف شد');
            res.redirect('/dashboard/users');
        });
    }
});

router.get('/delete-acount', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Acount.deleteOne({_id: req.query.acountID}, (err) => {
            req.flash('success_msg', 'حساب با موفقیت حذف شد');
            res.redirect(`/dashboard/user-view?userID=${req.query.userID}`);
        });
    }
});

router.get('/user-view', ensureAuthenticated, (req, res, next) => {
    var {userID} = req.query;
    if(req.user.role == 'admin'){
        User.findById(userID, (err, viewingUser) => {
            Acount.find({ownerID: userID}, (err, acounts) => {
                res.render('./dashboard/admin-user-view', {
                    user: req.user,
                    viewingUser,
                    acounts,
                });
            });
        });
    }
});

router.post('/admin-register', ensureAuthenticated, (req, res, next) => {
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
                const newUser = new User({ipAddress, fullname, firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, password, role, card});
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
});

router.post('/edit-user', ensureAuthenticated, (req, res, next) => {
    const {userID, firstName, lastName, fatherName, idNumber, cardNumber, address, postCode, phone} = req.body;
    const fullname = firstName + ' ' + lastName;
    User.updateMany({_id: userID}, {$set: {firstName, lastName, fatherName, idNumber, cardNumber, address, postCode, phone, fullname}}, (err) => {
        req.flash('success_msg', 'اطلاعات با موفقیت ثبت شد');
        res.redirect(`/dashboard/user-view?userID=${userID}`);
    });
});

router.get('/delete-file', ensureAuthenticated, (req, res, next) => {
    var {userID, index} = req.query;
    User.findById(userID, (err, user) => {
        var newFile = user.file;
        newFile.splice(index, 1);
        User.updateMany({_id: userID}, {$set: {file: newFile}}, (err) => {
            res.redirect(`/dashboard/user-view?userID=${userID}`);
        });
    })
});

router.get('/acount-view', ensureAuthenticated, (req, res, next) => {
    var {acountID} = req.query;
    Acount.findById(acountID, (err, acount) => {
        User.findById(acount.ownerID, (err, user) => {
            res.render('./dashboard/acount-view', {
                user: req.user,
                viewingUser: user,
                acount,

            })
        });
    });
})

router.get('/make-admin', ensureAuthenticated, (req, res, next) => {
    var {userID} = req.query;
    if(req.user.role == 'admin'){
        User.updateMany({_id: userID}, {$set: {role: 'admin'}}, (err) => {
            res.redirect('/dashboard/users');
        })
    }
})

router.get('/make-user', ensureAuthenticated, (req, res, next) => {
    var {userID} = req.query;
    if(req.user.role == 'admin'){
        User.updateMany({_id: userID}, {$set: {role: 'user'}}, (err) => {
            res.redirect('/dashboard/users');
        })
    }
})



module.exports = router;

