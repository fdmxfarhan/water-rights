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
    User.find({role: 'user'}, (err, users) => {
        res.render('./abmantaghei/dashboard', {
            user: req.user,
            users,
            
        });
    });
});

module.exports = router;

