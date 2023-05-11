require('dotenv').config();
var express = require('express');
var cron = require('node-cron');
var axios = require('axios').default;
var router = express.Router();
var LeagueStandingsSchema = require('../schemas/league_standings');
var LeagueMatches = require('../schemas/league_matches');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.json('Matchday Madness API');
});

// GET league standings info from database
router.get('/LeagueStandings', function (req, res, next) {
	async function getLeagueStandings() {
		return await LeagueStandingsSchema.findById('64599085c4e8574470f56317').exec();
	}
	getLeagueStandings().then((item) => res.json(item));
});

// update league standings every 30 seconds using API
cron.schedule('*/30 * * * * *', function () {
	console.log('Fetching standings');

	const reqOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': process.env.APITOKEN,
		},
	};

	axios
		.get('http://api.football-data.org/v4/competitions/PL/standings', reqOptions)
		.then(function (response) {
			// create new database item using response
			const newDatabaseSchema = new LeagueStandingsSchema({
				_id: '64599085c4e8574470f56317',
				standings: response.data.standings[0].table,
				randNum: Math.floor(Math.random() * 100),
			});

			// update the database item
			async function update() {
				await LeagueStandingsSchema.findByIdAndUpdate(
					'64599085c4e8574470f56317',
					newDatabaseSchema
				).exec();
			}
			update();
		});
});

// GET league matches info from database
router.get('/LeagueMatches', function (req, res, next) {
	async function getLeagueMatches() {
		return await LeagueMatches.findById('645d3b3c7a93d18976432e2a').exec();
	}
	getLeagueMatches().then((item) => res.json(item));
});

// update league matches info every 30 seconds using API
cron.schedule('*/30 * * * * *', function () {
	console.log('Fetching matches');

	const reqOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': process.env.APITOKEN,
		},
	};

	axios
		.get('http://api.football-data.org/v4/competitions/PL/matches', reqOptions)
		.then(function (response) {
			var standings = new LeagueMatches({
				_id: '645d3b3c7a93d18976432e2a',
				matches: response.data.matches,
				randNum: Math.floor(Math.random() * 100),
			});

			async function update() {
				await LeagueMatches.findByIdAndUpdate(
					'645d3b3c7a93d18976432e2a',
					standings
				).exec();
			}
			update();
		});
});

module.exports = router;
