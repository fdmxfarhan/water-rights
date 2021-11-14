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
    // fs.readFile('./public/t.html', 'utf8', (err, html) => {
    // html = fs.createReadStream('./public/t.html');
        var options = {
            phantomPath: phantomjs.path,
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
            }
        };
        var document = {
            html: '<p>html</p>',
            data: {
                // info: {
                //     fullname: fullname,
                //     accountNumber: accountNumber,
                //     maximum: maximum,
                //     idNumber: idNumber,
                //     date: convertDate(new Date()),
                //     formNumber: 1,
                // }
            },
            path: "public/output.pdf",
            type: "",
        };
    
        pdf.create(document, options)
            .then((r) => {
                res.send("<a href='/output.pdf' target='_blank'>دانلود</a>")
            })
            .catch((error) => {
                console.error(error);
            });
    // });

})

module.exports = router;
