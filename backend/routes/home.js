var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const {convertDate} = require('../config/dateConvert');
// var pdf = require("pdf-creator-node");
var pdf = require('html-pdf');

var path = require('path');
var fs = require('fs');



router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/form', (req, res, next) => {
    res.render('form');
})

router.post('/form', (req, res, next) => {
    var {fullname, accountNumber, maximum, idNumber} = req.body;
    fs.readFile('public/t.html', 'utf8', (err, html) => {
        var options = {
            format: "A4",
        };
        pdf.create(html, options).toFile('./public/businesscard.pdf', function(err, res2) {
            if (err) return console.log(err);
            console.log(res2); // { filename: '/app/businesscard.pdf' }
            res.send("<a href='/businesscard.pdf' target='_blank'>دانلود</a>")
        });
        // var document = {
        //     html: html,
        //     data: {
        //         info: {
        //             fullname: fullname,
        //             accountNumber: accountNumber,
        //             maximum: maximum,
        //             idNumber: idNumber,
        //             date: convertDate(new Date()),
        //             formNumber: 1,
        //         }
        //     },
        //     path: "public/output.pdf",
        //     type: "",
        // };
    
        // pdf.create(document, options)
        //     .then((r) => {
        //         res.send("<a href='/output.pdf' target='_blank'>دانلود</a>")
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    });

})

module.exports = router;
