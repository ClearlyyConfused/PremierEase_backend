var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeagueNews = new Schema({
	news: { type: [Object], required: true },
	lastUpdated: { type: Date, required: true },
});

module.exports = mongoose.model('LeagueNews', LeagueNews);
