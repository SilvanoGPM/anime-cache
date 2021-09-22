const { cache } = require("../lib/Cache");

async function useCache(key, func) {
  const cached = await cache.get(key);

  if (cached) {
    return cached;
  }

  const value = await func();

  cache.set(key, value);

  return value;
}

module.exports = useCache;
