const Redis = require('ioredis');

/** Classe que abstrai o uso de cache. */
class Cache {

  /** Cria uma nova instância do objeto. */
  constructor() {
    const { REDIS_HOST, REDIS_PORT } = process.env;

    this.redis = new Redis({
      host: REDIS_HOST || 'localhost',
      port: REDIS_PORT || 6379,
      keyPrefix: 'cache:',
    });
  }
  /**
   * Método para obter o valor em cache.
   * @param {string} key Chave para obter o valor em cache.
   */
  async get(key) {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Método para adicionar um novo valor em cache, baseado na chave.
   * @param {string} key Chave para adicionar novo valor.
   * @param {Object} value Novo valor a ser adicionado.
   * @param {number} expirationTime=60 Tempo em que esse valor será expirado.
   */
  set(key, value, expirationTime = 60) {
    const parsedValue = JSON.stringify(value);
    return this.redis.set(key, parsedValue, 'EX', expirationTime);
  }
  /**
   * Método para remover determinado valor, baseado na chave.
   * @param {string} key Chave para remover valor.
   */
  del(key) {
    return this.redis.del(key);
  }

}

module.exports = {
  Cache,
  cache: new Cache(),
};
