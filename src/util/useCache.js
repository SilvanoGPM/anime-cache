const { cache } = require("../lib/Cache");

/**
 * @typedef {Object} UseCacheOptions Opções para uso da função.
 * @property {number} expirationTime Tempo para determinada chave expirar.
 */

/**
 * Função para ter menos código repetitivo na hora de usar cache.
 * @param {string} key Chave para acessar o valor em cache.
 * @param {Function} func Função para executar quando a chave não for encontrada.
 * @param {UseCacheOptions} options Opções para uso da função.
 */
async function useCache(key, func, options) {
  const { expirationTime } = options;
  const cached = await cache.get(key);

  if (cached) {
    return cached;
  }

  const value = await func();

  cache.set(key, value, expirationTime);

  return value;
}

module.exports = useCache;
