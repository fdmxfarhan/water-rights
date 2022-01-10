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

router.get('/', ensureAuthenticated, (req, res, next) => {
    User.find({}, (err, users) => {
        Acount.find({}, (err, accounts) => {
            Acount.findOne({type: 'mirab'}, (err, mirab) => {
                Acount.findOne({type: 'abkhan'}, (err, abkhan) => {
                    Notification.find({}, (err, notifications) => {
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

module.exports = router;

