const request = require('request');

module.exports = (phone, text) => {
    request.post({
        url: 'http://ippanel.com/api/select',
        body: {
            // "apikey": "oCKusiGXHrxn09KaLVplYGRwauCAUanMte-eq8qFhfs=",
            "op" : "send",
            "uname" : "09336448037",
            "pass":  "faraz2581340517",
            "message" : text,
            "from": "+98100020400",
            "to" : [phone],
        },
        json: true,
    }, (error, response, body) => {
        // console.log(respo
        
        if (!error && response.statusCode === 200) {
            console.log(response.body);
        } else {
            if(error) console.log(error);
        }
    });
}
