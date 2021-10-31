var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Acount = require('../models/Acount');
var Notification = require('../models/Notification');
var Transmission = require('../models/Transmission');
const mail = require('../config/mail');
const dateConvert = require('../config/dateConvert');


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
        User.find({}, (err, users) => {
            Acount.find({}, (err, accounts) => {
                Notification.find({}, (err, notifications) => {
                    Transmission.find({done: false}, (err, transmissions) => {
                        var sumCharge = 0;
                        if(accounts.length > 1)
                            sumCharge = accounts.map(e => parseInt(e.charge)).reduce((a, b) => a+b);
                        res.render('./dashboard/admin-dashboard', {
                            user: req.user,
                            login: req.query.login,
                            notifications,
                            dateConvert,
                            transmissions,
                            users,
                            accounts,
                            sumCharge,
                        });
                    })
                })
                Notification.updateMany({seen: false}, {$set: {seen: true}}, (err, notifications) => {
                    if(err) console.log(err)
                });
            });
        })
    }
});
router.get('/users', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        User.find({}, (err, users) => {
            Acount.find({}, (err, accounts) => {
                for(var i=0; i<users.length; i++){
                    users[i].numberOfAbvandi = 0;
                    users[i].numberOfChahvandi = 0;
                    users[i].numberOfChah = 0;
                    users[i].numberOfAbvandi = accounts.filter(e => e.ownerID == users[i]._id.toString() && e.type == 'abvandi').length;
                    users[i].numberOfChahvandi = accounts.filter(e => e.ownerID == users[i]._id.toString() && e.type == 'chahvandi').length;
                    users[i].numberOfChah = accounts.filter(e => e.ownerID == users[i]._id.toString() && e.type == 'chah').length;
                }
                res.render('./dashboard/admin-users', {
                    user: req.user,
                    users,
                });
            })
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
    var { redirect } = req.query;
    if(req.user.role == 'admin'){
        Acount.deleteOne({_id: req.query.acountID}, (err) => {
            req.flash('success_msg', 'حساب با موفقیت حذف شد');
            if(redirect)
                res.redirect(redirect);
            else
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
        User.findOne({$or: [{idNumber: idNumber},{phone: phone}]}).then(user =>{
            if(user){
                // user exist
                errors.push({msg: 'کد ملی یا شماره تلفن قبلا ثبت شده است.'});
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
    Acount.findById(acountID, (err, account) => {
        User.findById(account.ownerID, (err, user) => {
            User.find({}, (err, users) => {
                Acount.find({}, (err, accounts) => {
                    res.render('./dashboard/acount-view', {
                        user: req.user,
                        viewingUser: user,
                        account,
                        users,
                        accounts,
                    })
                });
            });
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
router.get('/accounts', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        User.find({}, (err, users) => {
            Acount.find({}, (err, accounts) => {
                res.render('./dashboard/admin-accounts', {
                    user: req.user,
                    users,
                    accounts,
                    
                });
            });
        });
    }
})
router.get('/accept-transmission', ensureAuthenticated, (req, res, next) => {
    var {transmissionID} = req.query;
    Transmission.findById(transmissionID, (err, transmission) => {
        Acount.findById(transmission.source._id, (err, source) => {
            Acount.findById(transmission.target._id, (err, target) => {
                Acount.updateMany({_id: source._id}, {$set: {charge: source.charge - transmission.amount}}, (err) => {});
                Acount.updateMany({_id: target._id}, {$set: {charge: target.charge + transmission.amount}}, (err) => {});
                Transmission.updateMany({_id: transmissionID}, {$set: {done: true, accepted: true}}, (err) => {
                    res.redirect('/dashboard');
                });
            });
        });
    });
});

router.get('/decline-transmission', ensureAuthenticated, (req, res, next) => {
    var {transmissionID} = req.query;
    Transmission.updateMany({_id: transmissionID}, {$set: {done: true, accepted: false}}, (err) => {
        res.redirect('/dashboard');
    });
});


module.exports = router;

