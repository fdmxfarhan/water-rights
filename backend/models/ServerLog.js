var mongoose = require('mongoose');

var ServerLogSchema = new mongoose.Schema({
    type: String,
    date: Date,
    before: Object,
    after: Object,
    userID: String,
    fullname: String,
    title: String
});

var ServerLog = mongoose.model('ServerLog', ServerLogSchema);

module.exports = ServerLog;


