const queryString = require('query-string');

const api = require('./api');
const useCache = require('../util/useCache');

/** Serviço para a API de animes. */
class AnimeService {

  /**
   * Método para buscar os animes, baseado nos parâmetros passados.
   * @param {Object} params Parâmetros em forma de objeto.
   */
  async searchAnimes(params) {
    const resolvedParams = this.#resolveParams(params);

    const callback = async () => (
      api.searchAnimes(resolvedParams)
    );

    return useCache(resolvedParams, callback, {
      expirationTime: 60 * 60 // One hour
    });
  }
  /**
   * Método privado para converter objeto de parâmetros em string.
   * @param {Object} params Parâmetros em forma de objeto.
   * @return {string} Objeto de parâmetros convertido em string.
   */
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
