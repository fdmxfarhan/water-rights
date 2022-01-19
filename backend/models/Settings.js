var mongoose = require('mongoose');

var SettingsSchema = new mongoose.Schema({
    startYearDate: Date,
    endYearDate: Date,
    startYearDateJ: Object,
    endYearDateJ: Object,
    startYearDateS: String,
    endYearDateS: String,
    internalMirabRight: {type: Number, default: 0.05},
    externalMirabRight: {type: Number, default: 0.05},
    abkhanRight: {type: Number, default: 0.1},
});

var Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;


