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
var ServerLog = require('../models/ServerLog');
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
                                smsIndex: req.query.smsIndex,
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
router.post('/register-user', ensureAuthenticated, (req, res, next) => {
    const {firstName, lastName, idNumber, cardNumber, birthDay, birthMonth, birthYear, sex, fatherName, address, postCode, phone, password, configpassword} = req.body;
    const role = 'user', card = 0;
    const ipAddress = req.connection.remoteAddress;
    let errors = [];
    if(password !== configpassword){
        errors.push({msg: '?????????? ?????? ???????? ???????? ??????????????!'});
    }
    /// check password length
    if(password.length < 4){
        errors.push({msg: '?????? ???????? ?????? ?????????? ???????? ????????????!'});
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
    else if(req.user.role != 'user'){
        const fullname = firstName + ' ' + lastName;
        User.findOne({$or: [{idNumber: idNumber},{phone: phone}]}).then(user =>{
            if(user){
                // user exist
                errors.push({msg: '???? ?????? ???? ?????????? ???????? ???????? ?????? ?????? ??????.'});
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
                Acount.find({}, (err, accounts) => {
                    var accountNumber = 114110;
                    for(var i=0; i<accounts.length; i++)
                        if(accounts[i].accountNumber > accountNumber)
                            accountNumber = accounts[i].accountNumber
                    const newUser = new User({username: accountNumber+1,ipAddress, fullname, firstName, lastName, idNumber, cardNumber, birthDate: {day: birthDay, month: birthMonth, year: birthYear}, sex, fatherName, address, postCode, phone, password, role, card});
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.log(err);
                        newUser.password = hash;
                        newUser.save().then(user => {
                            Settings.findOne({}, (err, settings) => {
                                var owner = 'undefined';
                                if(newUser) owner = newUser.fullname;
                                var newAccount = new Acount({
                                    accountNumber: accountNumber+1,
                                    owner,
                                    ownerID: newUser._id,
                                    type: 'abvandi',
                                    charge: 0,
                                    creationDate: new Date,
                                    endDate: settings.endYearDateJ,
                                    startDate: settings.startYearDateJ,
                                })
                                newAccount.save().then(doc => {
                                    var newLog = new ServerLog({
                                        type: 'user-register',
                                        date: new Date(),
                                        fullname: req.user.fullname,
                                        userID: req.user._id,
                                        after: newUser,
                                        title: '?????? ?????????????? ???????? ???? ?????????? ????',
                                    })
                                    newLog.save().then(doc => {
                                        req.flash(`success_msg', '?????????? ???? ???? ???? ???????? ${newAccount.accountNumber} ?????? ????`);
                                        if(req.user.role == '??????????????')
                                            res.redirect(`/kargozar?userIndex=${req.body.userIndex}`);
                                        else if(req.user.role == '???????? ???? ????????')
                                            res.redirect(`/tashakol/?userIndex=${req.body.userIndex}`);
                                    }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                            });
                        }).catch(err => console.log(err));
                    }));
                });
            }
        });
    }
});
router.post('/add-chah-account', ensureAuthenticated, upload.single('licensePic'), (req, res, next) => {
    var {accountNumber, userID, owner, userIndex, license, permitedUseInYear, permitedAbdehi, permitedWorkTime, UTM, useType, pomp, wellCap, sellCap, buyCap, depth, power, abdehi, farmingType, area} = req.body;
    var file = req.file;
    Settings.findOne({}, (err, settings) => {
        Acount.findOne({$or: [{license: license}, {accountNumber: accountNumber}]}, (err, acount) => {
            if(acount){
                req.flash('error_msg', '?????????? ???????????? ???? ???? ???????????? ???????? ?????? ??????');
                if(req.user.role == '??????????????')
                    res.redirect(`/kargozar?userIndex=${userIndex}`);
                if(req.user.role == '???????? ???? ????????')
                    res.redirect(`/tashakol?userIndex=${userIndex}`);
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
                        accountNumber,
                    });
                    newAcount.save().then(doc => {
                        Acount.find({}, (err, accounts) => {
                            // var accountNumber = 114110;
                            // for(var i=0; i<accounts.length; i++)
                            //     if(accounts[i].accountNumber > accountNumber)
                            //         accountNumber = accounts[i].accountNumber
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
                                accountNumber: accountNumber+'1',
                            });
                            newAcount2.save().then(doc => {
                                User.updateMany({_id: userID}, {$set: {chahvand: true, regStatusNum: user.regStatusNum+1}}, (err, doc) => {
                                    sms2(user.phone, '???????? ?????? ?????? ???? ???????????? ?????????? ?????? ????\n??????????');
                                    var newAdminNotif = new AdminNotif({
                                        target: '???? ?????????????????',
                                        type: 'state-0',
                                        text: `?????????????? ???????? ???? ?????????? ${user.fullname} ???????? ?????????????? ?????????????? ?????? ????. ?????? ?????????? ?? ?????????? ?????????? ???????? ?? ???????????? ???????? ????????.`,
                                        date: new Date(),
                                        userID: userID,
                                    });
                                    newAdminNotif.save().then(doc => {
                                        req.flash('success_msg', '???????? ?????? ???? ???????????? ?????????? ????');
                                        if(req.user.role == '??????????????')
                                            res.redirect(`/kargozar?userIndex=${userIndex}`);
                                        if(req.user.role == '???????? ???? ????????')
                                            res.redirect(`/tashakol?userIndex=${userIndex}`);
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
    var {userID, owner, userIndex, comment, beneficiaryName, beneficiaryIdNumber, beneficiaryPhone, beneficiaryAgree} = req.body;
    var file = req.file;
    var commitmentLetter = '';
    if(file) commitmentLetter = file.destination.slice(6) + '/' + file.originalname;
    var beneficiaries = [];
    if(typeof(beneficiaryName) == 'object'){
        for(var i=1; i<beneficiaryName.length; i++){
            beneficiaries.push({
                name: beneficiaryName[i],
                idNumber: beneficiaryIdNumber[i],
                phone: beneficiaryPhone[i],
                agree: typeof(beneficiaryAgree[i]) == 'undefined'? false: true,
            });
        }
    }
    User.findById(userID, (err, user) => {
        AdminNotif.updateMany({userID: userID}, {$set: {seen: true}}, (err, doc) => {
            User.updateMany({_id: userID}, {$set: {comment4: comment, regStatusNum: user.regStatusNum+1, commitmentLetter, confirmed: true, beneficiaries}}, (err) => {
                req.flash('success_msg', '?????????????? ???? ???????????? ?????? ????');
                res.redirect(`/kargozar?userIndex=${userIndex}`);
            });
        });
    });
});
router.post('/confirm-charge', ensureAuthenticated, (req, res, next) => {
    var {userID, owner, userIndex, chahID, comment, permitedUseInYear, usedCredit, leftCredit, confirm} = req.body;
    console.log(req.body);
    if(confirm == 'true'){
        Acount.updateMany({_id: chahID}, {$set: {permitedUseInYear, usedCredit, leftCredit}}, (err, doc) => {
            User.findById(userID, (err, user) => {
                User.updateMany({_id: userID}, {$set: {comment1: comment, regStatusNum: user.regStatusNum+1}}, (err, doc) => {
                    AdminNotif.updateMany({userID: userID}, {$set: {seen: true}}, (err, doc) => {
                        sms2(user.phone, '???????????? ???????? ???? ?????????? ???? ?????????? ????. \n??????????')
                        if(err) console.log(err);
                        req.flash('success_msg', '?????????? ???????? ?????????? ????.');
                        res.redirect(`/abmantaghei?userIndex=${userIndex}`);
                    });
                });
            });
        });
    }
    else{
        Acount.updateMany({_id: chahID}, {$set: {permitedUseInYear, usedCredit, leftCredit}}, (err, doc) => {
            User.findById(userID, (err, user) => {
                User.updateMany({_id: userID}, {$set: {comment1: comment, failedCredit: true}}, (err, doc) => {
                    AdminNotif.updateMany({$or: [{target: '???? ?????????????????', type: 'state-0', userID: userID}, {target: '??????????????', type: 'state-1', userID: userID}]}, {$set: {seen: true}}, (err, doc) => {
                        if(err) console.log(err);
                        var newAdminNotif = new AdminNotif({
                            target: '??????????????',
                            type: 'state-1',
                            text: `?????????? ???????? ?? ???????????? ????????????????????????? ???????? ${user.fullname} ???????? ?????????????? ???? ????????????????? ???? ????. ?????? ??????????????: ${comment}\n`,
                            date: new Date(),
                            userID: userID,
                        });
                        newAdminNotif.save().then(doc => {
                            req.flash('success_msg', '???? ?????????????? ?????????? ???????? ????.');
                            res.redirect(`/abmantaghei?userIndex=${userIndex}`);
                        }).catch(err => console.log(err));
                    });
                });
            });
        });
    }
});



module.exports = router;

