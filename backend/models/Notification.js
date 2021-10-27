var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
    type: String,
    text: String,
    seen: {
        type: Boolean,
        default: false,
    },
    date: Date,
    link: String,
});

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;


