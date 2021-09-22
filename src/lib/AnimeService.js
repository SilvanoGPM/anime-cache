const queryString = require('query-string');

const api = require('./api');
const useCache = require('../util/useCache');

const cacheOptions = {
  expirationTime: 60 * 60 // One hour
};

class AnimeService {

  async searchAnimes(params) {
    const resolvedParams = this.#resolveParams(params);

    const callback = async () => (
      api.searchAnimes(resolvedParams)
    );

    return useCache(resolvedParams, callback, cacheOptions);
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
