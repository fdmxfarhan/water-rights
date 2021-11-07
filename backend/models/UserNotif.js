var mongoose = require('mongoose');

var UserNotifSchema = new mongoose.Schema({
    type: String,
    text: String,
    seen: {
        type: Boolean,
        default: false,
    },
    date: Date,
    link: String,
    userID: String,
    userFullname: String,
});

var UserNotif = mongoose.model('UserNotif', UserNotifSchema);

module.exports = UserNotif;


