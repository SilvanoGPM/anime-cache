const express = require('express');

const { animeService } = require('./lib/AnimeService');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/search/animes', async (req, res) => {
  const params = req.query;

  const animes = await animeService.searchAnimes(params);

  res.json(animes);
});

app.listen(PORT, () => {
  console.log(`📡 [anime-cache] listen on port: "${PORT}"`);
});
