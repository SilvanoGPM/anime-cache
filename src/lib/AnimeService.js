const queryString = require('query-string');

const api = require('./api');
const useCache = require('../util/useCache');

class AnimeService {

  async searchAnimes(params) {
    const resolvedParams = this.#resolveParams(params);

    return useCache(resolvedParams, async () => {
      const animes = await api.searchAnimes(resolvedParams);
      return animes;
    });
  }

  #resolveParams(params) {
    return queryString
      .stringify(params, { sort: false })
      .replace('name', 'q')
      .toLocaleLowerCase();
  }

}

module.exports = {
  AnimeService,
  animeService: new AnimeService(),
};
