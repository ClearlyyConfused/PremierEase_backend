require('dotenv').config();
var express = require('express');
var cron = require('node-cron');
var axios = require('axios').default;
var router = express.Router();
var LeagueStandingsSchema = require('../schemas/league_standings');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/LeagueStandings', function (req, res, next) {
	// create new database item
	const newDatabaseSchema = new LeagueStandingsSchema({
		teamName: 'TeamName',
		teamPosition: 1,
	});

	// save database item
	newDatabaseSchema.save();
	res.send('Success');
});

cron.schedule('*/10 * * * * *', function () {
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
