var mongoose = require('mongoose');

var SettingsSchema = new mongoose.Schema({
    startYearDate: Date,
    endYearDate: Date,
    startYearDateJ: Object,
    endYearDateJ: Object,
    startYearDateS: String,
    endYearDateS: String,
});

var Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;


