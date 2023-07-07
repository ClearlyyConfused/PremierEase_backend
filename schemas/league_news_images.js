var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeagueNewsImages = new Schema({
	newsImages: { type: [Object], required: true },
	lastUpdated: { type: Date, required: true },
});

module.exports = mongoose.model('LeagueNewsImages', LeagueNewsImages);
