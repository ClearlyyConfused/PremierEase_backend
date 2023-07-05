require('dotenv').config();
var express = require('express');
var axios = require('axios').default;
var router = express.Router();
var LeagueStandingsSchema = require('../schemas/league_standings');
var LeagueMatches = require('../schemas/league_matches');
var LeagueNews = require('../schemas/league_news');
var LeagueTeams = require('../schemas/league_teams');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.API2TOKEN);

/* GET home page. */
router.get('/', function (req, res, next) {
	res.json('Matchday Madness API');
});

// GET league standings info from database
router.get('/LeagueStandings', function (req, res, next) {
	const currentTime = new Date();

	const reqOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': process.env.APITOKEN,
		},
	};

	async function getLeagueStandings() {
		return await LeagueStandingsSchema.findById('64599085c4e8574470f56317').exec();
	}
	getLeagueStandings().then((item) => {
		const timeSinceLastUpdate = Math.abs(currentTime - item.lastUpdated) / 1000;

		if (timeSinceLastUpdate >= 30) {
			axios
				.get('http://api.football-data.org/v4/competitions/PL/standings', reqOptions)
				.then(function (response) {
					// create new database item using response
					const newDatabaseSchema = new LeagueStandingsSchema({
						_id: '64599085c4e8574470f56317',
						standings: response.data.standings[0].table,
						randNum: Math.floor(Math.random() * 100),
						lastUpdated: currentTime,
					});

					// update the database item
					async function update() {
						const updatedStandings = await LeagueStandingsSchema.findByIdAndUpdate(
							'64599085c4e8574470f56317',
							newDatabaseSchema,
							{ new: true }
						).exec();
						res.json(updatedStandings);
					}
					update();
				});
		} else {
			res.json(item);
		}
	});
});

// GET league matches info from database
router.get('/LeagueMatches', function (req, res, next) {
	const currentTime = new Date();

	const reqOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': process.env.APITOKEN,
		},
	};

	async function getLeagueMatches() {
		return await LeagueMatches.findById('645d3b3c7a93d18976432e2a').exec();
	}
	getLeagueMatches().then((item) => {
		const timeSinceLastUpdate = Math.abs(currentTime - item.lastUpdated) / 1000;

		if (timeSinceLastUpdate >= 30) {
			axios
				.get('http://api.football-data.org/v4/competitions/PL/matches', reqOptions)
				.then(function (response) {
					var matches = new LeagueMatches({
						_id: '645d3b3c7a93d18976432e2a',
						matches: response.data.matches,
						randNum: Math.floor(Math.random() * 100),
						lastUpdated: currentTime,
					});

					async function update() {
						const updatedLeagueMatches = await LeagueMatches.findByIdAndUpdate(
							'645d3b3c7a93d18976432e2a',
							matches,
							{ new: true }
						).exec();
						res.json(updatedLeagueMatches);
					}
					update();
				});
		} else {
			res.json(item);
		}
	});
});

// GET league teams info
router.get('/LeagueTeams', function (req, res, next) {
	const currentTime = new Date();

	const reqOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': process.env.APITOKEN,
		},
	};

	async function getLeagueTeams() {
		return await LeagueTeams.findById('64a4c7c6c5f1a1d3c737c994').exec();
	}

	getLeagueTeams().then((item) => {
		const timeSinceLastUpdate = Math.abs(currentTime - item.lastUpdated) / 36e5;

		if (timeSinceLastUpdate >= 12) {
			axios
				.get('http://api.football-data.org/v4/competitions/PL/teams', reqOptions)
				.then(function (response) {
					var teams = new LeagueTeams({
						_id: '64a4c7c6c5f1a1d3c737c994',
						teamsInfo: response.data.teams,
						randNum: Math.floor(Math.random() * 100),
						lastUpdated: currentTime,
					});

					async function update() {
						const updatedLeagueTeams = await LeagueTeams.findByIdAndUpdate(
							'64a4c7c6c5f1a1d3c737c994',
							teams,
							{ new: true }
						).exec();
						res.json(updatedLeagueTeams);
					}
					update();
				});
		} else {
			res.json(item);
		}
	});
});

// GET league news info from database
router.get('/LeagueNews', function (req, res, next) {
	const currentTime = new Date();

	const params = {
		q: 'premier league',
		tbm: 'nws',
		location: 'Austin, TX, Texas, United States',
	};

	async function getLeagueNews() {
		return await LeagueNews.findById('645feca5ad425349e2db3f2e').exec();
	}
	getLeagueNews().then((item) => {
		const timeSinceLastUpdate = Math.abs(currentTime - item.lastUpdated) / 36e5;

		if (timeSinceLastUpdate >= 12) {
			search.json(params, (response) => {
				var news = new LeagueNews({
					_id: '645feca5ad425349e2db3f2e',
					news: response,
					lastUpdated: currentTime,
				});
				async function update() {
					const updatedLeagueNews = await LeagueNews.findByIdAndUpdate('645feca5ad425349e2db3f2e', news, {
						new: true,
					}).exec();
					res.json(updatedLeagueNews);
				}
				update();
			});
		} else {
			res.json(item);
		}
	});
});

module.exports = router;
