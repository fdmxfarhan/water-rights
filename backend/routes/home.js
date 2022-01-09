var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const {convertDate} = require('../config/dateConvert');
var pdf = require("pdf-creator-node");
var path = require('path');
var fs = require('fs');
var phantomjs = require('phantomjs');
var Notification = require('../models/Notification');
var Transmission = require('../models/Transmission');
var Acount = require('../models/Acount');
var User = require('../models/User');

router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/forms', ensureAuthenticated, (req, res, next) => {
    var {transmissionID} = req.query;
    Transmission.findById(transmissionID, (err, transmission) => {
        Acount.findById(transmission.source._id, (err, source) => {
            Acount.findById(transmission.target._id, (err, target) => {
                User.findById(source.ownerID, (err, sourceUser) => {
                    User.findById(target.ownerID, (err, targetUser) => {
                        fs.readFile('./public/form1.html', 'utf8', (err, form1) => {
                            fs.readFile('./public/form2.html', 'utf8', (err, form2) => {
                                fs.readFile('./public/form3.html', 'utf8', (err, form3) => {
                                    var options = {
                                        phantomPath: path.join(__dirname, '../node_modules/phantomjs/lib/phantom/bin/phantomjs'),
                                        // phantomPath: '/usr/local/share/phantomjs-1.9.8-linux-x86_64/bin/phantomjs',
                                        format: "A3",
                                        orientation: "portrait",
                                        border: "5mm",
                                        header: {
                                            height: "0",
                                            contents: ''
                                        },
                                        footer: {
                                            height: "0mm",
                                            contents: {}
                                        },
                                    };
                                    var document1 = {
                                        html: form1,
                                        data: {
                                            info: {
                                                fullname: source.owner,
                                                accountNumber: source.type == 'chah'? source.license : source.accountNumber,
                                                maximum: source.charge + transmission.amount,
                                                idNumber: sourceUser.idNumber,
                                                date: convertDate(new Date()),
                                                formNumber: 1,
                                            }
                                        },
                                        path: 'public/files/form1.pdf',
                                        type: "",
                                    };
                                    var document2 = {
                                        html: form2,
                                        data: {
                                            info: {
                                                fullname: target.owner,
                                                accountNumber: target.type == 'chah'? target.license : target.accountNumber,
                                                maximum: target.charge + transmission.amount,
                                                idNumber: targetUser.idNumber,
                                                date: convertDate(new Date()),
                                                formNumber: 1,
                                                amount: transmission.amount
                                            }
                                        },
                                        path: 'public/files/form2.pdf',
                                        type: "",
                                    };
                                    var document3 = {
                                        html: form3,
                                        data: {
                                            info: {
                                                fullname: source.owner,
                                                accountNumber: source.type == 'chah'? source.license : source.accountNumber,
                                                maximum: source.charge + transmission.amount,
                                                idNumber: sourceUser.idNumber,
                                                date: convertDate(new Date()),
                                                formNumber: 1,
                                                amount: transmission.amount,
                                                form1Number: 1,
                                                form1Date: convertDate(new Date()),
                                                form2Number: 1,
                                                form2Date: convertDate(new Date()),
                                                endDate: `${source.startDate.year}/${source.startDate.month}/${source.startDate.day}`,
                                                sourceAccountNum: source.type == 'chah'? source.license : source.accountNumber,
                                                targetOwner: target.owner,
                                                targetOwnerID: target.type == 'chah'? target.license : target.accountNumber,
                                                
                                            }
                                        },
                                        path: 'public/files/form3.pdf',
                                        type: "",
                                    };
                                    pdf.create(document1, options).then((r) => {
                                        pdf.create(document2, options).then((r) => {
                                            pdf.create(document3, options).then((r) => {
                                                res.render('forms');
                                            }).catch((error) => {console.error(error)});
                                        }).catch((error) => {console.error(error)});
                                    }).catch((error) => {console.error(error)});
                                });
                            });
                        });
                    })
                })
            });
        });
    });
});

router.get('/form', (req, res, next) => {
    res.render('form');
})

router.post('/form', (req, res, next) => {
    var {fullname, accountNumber, maximum, idNumber} = req.body;
    fs.readFile('./public/form3.html', 'utf8', (err, html) => {
        var options = {
            phantomPath: path.join(__dirname, '../node_modules/phantomjs/lib/phantom/bin/phantomjs'),
            // phantomPath: '/usr/local/share/phantomjs-1.9.8-linux-x86_64/bin/phantomjs',
            format: "A3",
            orientation: "portrait",
            border: "5mm",
            header: {
                height: "0",
                contents: ''
            },
            footer: {
                height: "0mm",
                contents: {}
            },
        };
        var document = {
            html: html,
            data: {
                info: {
                    fullname: fullname,
                    accountNumber: accountNumber,
                    maximum: maximum,
                    idNumber: idNumber,
                    date: convertDate(new Date()),
                    formNumber: 1,
                }
            },
            path: 'public/files/out.pdf',
            type: "",
        };
    
        pdf.create(document, options)
            .then((r) => {
                res.send(`<a href='/files/out.pdf'>دانلود</a>`)
            })
            .catch((error) => {
                console.error(error);
            });
    });
});
router.get('/clearnotifs', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Notification.deleteMany({}, (err, doc) => {
            res.redirect('/dashboard');
        })
    }else res.send('access denied');
})
router.get('/cleartransmissions', ensureAuthenticated, (req, res, next) => {
    if(req.user.role == 'admin'){
        Transmission.deleteMany({}, (err, doc) => {
            res.redirect('/dashboard');
        })
    }else res.send('access denied');
})
router.get('/test', (req, res, next) => {
    res.render('test');
})
router.post('/transmit', (req, res, next) => {
    var {source, target, amount} = req.body;
    var newTransmission = new Transmission({
        source,
        target,
        amount,
        date: new Date,
    });
    newTransmission.save().then(doc =>{
        sms('09336448037', 'انتقال جدید در اپلیکیشن میراب');
        Acount.updateMany({_id: source._id}, {$set: {charge: source.charge - amount}}, (err) => {
            res.send({done: true});
        });
    }).catch(err => console.log(err));
})

module.exports = router;
