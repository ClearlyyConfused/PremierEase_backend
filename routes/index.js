require('dotenv').config();
var express = require('express');
var cron = require('node-cron');
var axios = require('axios').default;
var router = express.Router();
var LeagueStandingsSchema = require('../schemas/league_standings');

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

// update database every 30 seconds using API
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

module.exports = router;
