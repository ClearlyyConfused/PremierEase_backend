var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeagueMatches = new Schema({
	matches: { type: [Object], required: true },
	randNum: { type: Number, required: true },
});

module.exports = mongoose.model('LeagueMatches', LeagueMatches);
