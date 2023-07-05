var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeagueTeams = new Schema({
	teamsInfo: { type: [Object], required: true },
	randNum: { type: Number, required: true },
	lastUpdated: { type: Date, required: true },
});

module.exports = mongoose.model('LeagueTeams', LeagueTeams);
