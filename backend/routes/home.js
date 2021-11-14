var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const {convertDate} = require('../config/dateConvert');
var pdf = require("pdf-creator-node");
var path = require('path');
var fs = require('fs');
var phantomjs = require('phantomjs');


router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/form', (req, res, next) => {
    res.render('form');
})

router.post('/form', (req, res, next) => {
    var {fullname, accountNumber, maximum, idNumber} = req.body;
    var fileName = path.join(__dirname, 'public/files/out.pdf');
    console.log(fileName);
    fs.readFile('./public/form1.html', 'utf8', (err, html) => {
        var options = {
            phantomPath: '/usr/local/share/phantomjs-1.9.8-linux-x86_64/bin/phantomjs',
            format: "A4",
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
            path: fileName,
            type: "",
        };
    
        pdf.create(document, options)
            .then((r) => {
                res.send(`<a href='${fileName}'>دانلود</a>`)
            })
            .catch((error) => {
                console.error(error);
            });
    });
});

module.exports = router;
