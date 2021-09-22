const axios = require('axios').default;

const BASE_URL = 'https://api.jikan.moe/v3';

const api = {

  async searchAnimes(params) {
    const { data } = await axios.get(`${BASE_URL}/search/anime?${params}`);
    const animes = data.results;

    return animes;
  },

};

module.exports = api;
