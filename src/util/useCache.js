const { cache } = require("../lib/Cache");

async function useCache(key, func, { expirationTime }) {
  const cached = await cache.get(key);

  if (cached) {
    return cached;
  }

  const value = await func();

  cache.set(key, value, expirationTime);

  return value;
}

module.exports = useCache;
