var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeagueStandings = new Schema({
	standings: { type: [Object], required: true },
	randNum: { type: Number, required: true },
	lastUpdated: { type: Date, required: true },
});

module.exports = mongoose.model('LeagueStandings', LeagueStandings);
