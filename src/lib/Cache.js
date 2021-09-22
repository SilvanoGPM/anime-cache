const Redis = require('ioredis');

class Cache {

  constructor() {
    const { REDIS_HOST, REDIS_PORT } = process.env;

    this.redis = new Redis({
      host: REDIS_HOST || 'localhost',
      port: REDIS_PORT || 6379,
      keyPrefix: 'cache:',
    });
  }

  async get(key) {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  set(key, value, expirationTime = 60) {
    const parsedValue = JSON.stringify(value);
    return this.redis.set(key, parsedValue, 'EX', expirationTime);
  }

  del(key) {
    return this.redis.del(key);
  }

}

module.exports = {
  Cache,
  cache: new Cache(),
};
