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

Acount.findOne({type: 'mirab'}, (err, account) => {
    if(!account){
        var newAccount = new Acount({
            type: 'mirab',
            license: 'mirab',
            owner: 'میراب',
            ownerID: 'mirab',
            charge: 0,
            creationDate: new Date(),
        });
        newAccount.save().then(res => {}).catch(err => {
            if(err) console.log(err);
        });
    }
});
Acount.findOne({type: 'abkhan'}, (err, account) => {
    if(!account){
        var newAccount = new Acount({
            type: 'abkhan',
            license: 'abkhan',
            owner: 'آبخوان',
            ownerID: 'abkhan',
            charge: 0,
            creationDate: new Date(),
        });
        newAccount.save().then(res => {}).catch(err => {
            if(err) console.log(err);
        });
    }
});
Settings.findOne({}, (err, settings) => {
    if(!settings){
        var startYearDate = new Date();
        var endYearDate = new Date(startYearDate.getFullYear()+1, startYearDate.getMonth(), startYearDate.getDate());
        var startJ =  dateConvert.get_year_month_day(startYearDate);
        var endJ =  dateConvert.get_year_month_day(endYearDate);
        var newSettings = new Settings({
            startYearDate,
            endYearDate,
            startYearDateS: dateConvert.convertDate(startYearDate),
            endYearDateS: dateConvert.convertDate(endYearDate),
            startYearDateJ: {year: startJ[0], month: startJ[1], day: startJ[2]},
            endYearDateJ: {year: endJ[0], month: endJ[1], day: endJ[2]},
        });
        newSettings.save().then(doc => {
            console.log(newSettings);
        }).catch(err => {
            if(err) console.log(err);
        });
    }
})
  
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
                Acount.findOne({type: 'mirab'}, (err, mirab) => {
                    Acount.findOne({type: 'abkhan'}, (err, abkhan) => {
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
                                    mirab,
                                    abkhan,
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
});
router.get('/make-admin', ensureAuthenticated, (req, res, next) => {
    var {userID} = req.query;
    if(req.user.role == 'admin'){
        User.updateMany({_id: userID}, {$set: {role: 'admin'}}, (err) => {
            res.redirect('/dashboard/users');
        })
    }
});
router.get('/make-user', ensureAuthenticated, (req, res, next) => {
    var {userID} = req.query;
    if(req.user.role == 'admin'){
        User.updateMany({_id: userID}, {$set: {role: 'user'}}, (err) => {
            res.redirect('/dashboard/users');
        })
    }
});
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
});
var getMirabRight = (source, target, amount) => {
    if(source.type == 'chah' && target.type == 'chahvandi')
        return 0;
    return amount * 0.05
}
var getAbkhanRight = (source, target, amount) => {
    if(source.type == 'chahvandi' && target.type == 'chah'){
        if((amount - getMirabRight(source, target, amount)) * 0.1 - target.sandogh  < 0) return 0;
        return (amount - getMirabRight(source, target, amount)) * 0.1 - target.sandogh;
    }
    return 0;
}
var getSandoghRight = (source, target, amount) => {
    if(source.type == 'chah' && target.type == 'chahvandi'){
        return amount * 0.1
    }
    else if(source.type == 'chahvandi' && target.type == 'chah'){
        if((amount - getMirabRight(source, target, amount)) * 0.1 - target.sandogh  < 0) return -(amount - getMirabRight(source, target, amount)) * 0.1
        return -target.sandogh; 
    }
    return 0;
}
router.get('/accept-transmission', ensureAuthenticated, (req, res, next) => {
    var {transmissionID} = req.query;
    Transmission.findById(transmissionID, (err, transmission) => {
        Acount.findById(transmission.source._id, (err, source) => {
            Acount.findById(transmission.target._id, (err, target) => {
                var amount = transmission.amount;
                var mirab = getMirabRight(source, target, amount);
                var abkhan = getAbkhanRight(source, target, amount);
                var sandogh = getSandoghRight(source, target, amount);

                // Acount.updateMany({_id: source._id}, {$set: {charge: source.charge - transmission.amount}}, (err) => {});
                Acount.updateMany({_id: target._id}, {$set: {charge: target.charge + (transmission.amount - mirab - abkhan)}}, (err) => {});
                Acount.findOne({type: 'mirab'}, (err, mirabAccount) => {
                    Acount.updateMany({type: 'mirab'}, {$set: {charge: mirabAccount.charge+mirab}}, (err, doc) => {
                        if(err) console.log(err);
                    });
                });
                Acount.findOne({type: 'abkhan'}, (err, abkhanAccount) => {
                    Acount.updateMany({type: 'abkhan'}, {$set: {charge: abkhanAccount.charge+abkhan}}, (err, doc) => {
                        if(err) console.log(err);
                    });
                });
                if(source.type == 'chah') 
                    Acount.updateMany({_id: source._id}, {$set: {sandogh: source.sandogh + sandogh}}, (err) => {});
                if(target.type == 'chah')
                    Acount.updateMany({_id: target._id}, {$set: {sandogh: target.sandogh + sandogh}}, (err) => {});
                Transmission.updateMany({_id: transmissionID}, {$set: {done: true, accepted: true}}, (err) => {
                    var newUserNotif = new UserNotif({
                        type: 'accept-transmission',
                        text: `انتقال شارژ ${amount} متر مکعب از حساب ${source.type == 'chah' ? source.license : source.accountNumber} به حساب ${target.type == 'chah' ? target.license : target.accountNumber} توسط میراب تایید شد.`,
                        userID: source.ownerID,
                        userFullname: source.owner,
                        date: new Date(),
                    });
                    newUserNotif.save().then(doc => {}).catch(err => console.log(err));
                    res.redirect('/dashboard');
                });
            });
        });
    });
});
router.get('/transmissions', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Transmission.find({}, (err, transmissions) => {
            res.render('./dashboard/admin-transmissions', {
                user: req.user,
                transmissions,
                dateConvert,
            });
        });
    }
    else res.send('access denied');
})
router.get('/decline-transmission', ensureAuthenticated, (req, res, next) => {
    var {transmissionID} = req.query;
    Transmission.findById(transmissionID, (err, transmission) => {
        Acount.findById(transmission.source._id, (err, source) => {
            Acount.findById(transmission.target._id, (err, target) => {
                var newUserNotif = new UserNotif({
                    type: 'accept-transmission',
                    text: `انتقال شارژ ${transmission.amount} متر مکعب از حساب ${source.type == 'chah' ? source.license : source.accountNumber} به حساب ${target.type == 'chah' ? target.license : target.accountNumber} توسط میراب لغو شد.`,
                    userID: source.ownerID,
                    userFullname: source.owner,
                    date: new Date(),
                });
                newUserNotif.save().then(doc => {}).catch(err => console.log(err));
                
                Transmission.updateMany({_id: transmissionID}, {$set: {done: true, accepted: false}}, (err) => {
                    res.redirect('/dashboard');
                });
            });
        });
    });
});
router.get('/confirm-register', ensureAuthenticated, (req, res, next) => {
    var {userID, notifID} = req.query;
    User.updateMany({_id: userID}, {$set: {confirmed: true}}, (err, doc) => {
        Notification.deleteMany({_id: notifID}, (err) => {
            var newUserNotif = new UserNotif({
                type: 'accept-transmission',
                text: `حساب کاربری شما توسط میراب تایید شد.`,
                userID,
                date: new Date(),
            });
            newUserNotif.save().then(doc => {}).catch(err => console.log(err));
            
            res.redirect('/dashboard');
        });
    });
});
router.get('/block-account', ensureAuthenticated, (req, res, next) => {
    var {accountID} = req.query;
    Acount.updateMany({_id: accountID}, {$set: {blocked: true}}, (err, doc) => {
        res.redirect(`/dashboard/acount-view?acountID=${accountID}`);
    });
});
router.get('/unblock-account', ensureAuthenticated, (req, res, next) => {
    var {accountID} = req.query;
    Acount.updateMany({_id: accountID}, {$set: {blocked: false}}, (err, doc) => {
        res.redirect(`/dashboard/acount-view?acountID=${accountID}`);
    });
});
router.get('/settings', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Settings.findOne({}, (err, settings) => {
            res.render('./dashboard/admin-settings', {
                user: req.user,
                settings,
            });
        })
    }
});
router.post('/set-start-year', ensureAuthenticated, (req, res, next) => {
    var day = parseInt(req.body.day);
    var month = parseInt(req.body.month);
    var year = parseInt(req.body.year);
    var startYearDateJ = {day, month, year};
    var endYearDateJ = {day, month, year: year+1};
    var startG = dateConvert.jalali_to_gregorian(year, month, day);
    var endG = dateConvert.jalali_to_gregorian(year+1, month, day);
    var startYearDate = new Date(startG[0], startG[1]-1, startG[2]);
    var endYearDate = new Date(endG[0], endG[1]-1, endG[2]);
    var startYearDateS = dateConvert.convertDate(startYearDate);
    var endYearDateS = dateConvert.convertDate(endYearDate);
    Settings.updateMany({}, {$set: {
        startYearDateJ,
        endYearDateJ,
        startYearDate,
        endYearDate,
        startYearDateS,
        endYearDateS,
    }}, (err, doc) => {
        req.flash('success_msg', 'تغییرات با موفقیت ذخیره شد.');
        res.redirect('/dashboard/settings');
    })
});
router.post('/set-end-year', ensureAuthenticated, (req, res, next) => {
    var day = parseInt(req.body.day);
    var month = parseInt(req.body.month);
    var year = parseInt(req.body.year);
    var startYearDateJ = {day, month, year: year-1};
    var endYearDateJ = {day, month, year};
    var startG = dateConvert.jalali_to_gregorian(year, month, day);
    var endG = dateConvert.jalali_to_gregorian(year+1, month, day);
    var startYearDate = new Date(startG[0], startG[1]-1, startG[2]);
    var endYearDate = new Date(endG[0], endG[1]-1, endG[2]);
    var startYearDateS = dateConvert.convertDate(startYearDate);
    var endYearDateS = dateConvert.convertDate(endYearDate);
    Settings.updateMany({}, {$set: {
        startYearDateJ,
        endYearDateJ,
        startYearDate,
        endYearDate,
        startYearDateS,
        endYearDateS,
    }}, (err, doc) => {
        req.flash('success_msg', 'تغییرات با موفقیت ذخیره شد.');
        res.redirect('/dashboard/settings');
    })
});


module.exports = router;

