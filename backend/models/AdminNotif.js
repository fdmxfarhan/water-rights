var mongoose = require('mongoose');

var AdminNotifSchema = new mongoose.Schema({
    type: String,
    text: String,
    target: String,
    seen: {
        type: Boolean,
        default: false,
    },
    date: Date,
    link: String,
    userID: String,
});

var AdminNotif = mongoose.model('AdminNotif', AdminNotifSchema);

module.exports = AdminNotif;


