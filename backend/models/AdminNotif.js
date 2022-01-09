var mongoose = require('mongoose');

var AdminNotifSchema = new mongoose.Schema({
    type: String,
    text: String,
    seen: {
        type: Boolean,
        default: false,
    },
    date: Date,
    link: String,
});

var AdminNotif = mongoose.model('AdminNotif', AdminNotifSchema);

module.exports = AdminNotif;


