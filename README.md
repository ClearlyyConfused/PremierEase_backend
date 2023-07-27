# Premier Ease (backend) ⚽

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Backend for Premier Ease. Fetches information from external APIs and stores it in a MongoDB database. Retrieves information from the database when requested from the frontend.

## Deployment 🚀

https://matchday-madness-backend.vercel.app/

## API Reference 🧩

#### Get current league standings

```http
  GET /LeagueStandings
```

#### Get all league matches (upcoming, live, results)

```http
  GET /LeagueMatches
```

#### Get information about each team in the league

```http
  GET /LeagueTeams
```

#### Get news articles from Google images result (returns with high quality images)

```http
  GET /LeagueNewsImages
```

#### Get news articles from Google news result

```http
  GET /LeagueNews
```

## Related

- [Premier Ease Frontend](https://github.com/ClearlyyConfused/PremierEase)
- [football-data.org (external API used for standings, matches, teams info)](https://www.football-data.org/)
- [Serpapi (external API used for news articles from Google)](https://serpapi.com/)
