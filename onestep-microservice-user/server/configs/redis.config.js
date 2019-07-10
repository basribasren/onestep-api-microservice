const redis = require('redis');
/**
 * This is a complete and feature rich Redis client for node.js.
 * It supports all Redis commands and focuses on high performance.
 * if connection error redis will always trying reconnect in background,
 * don't need close connection when error
 * @return {[type]} [description]
 */
const redisConfig = () => {
  const HOST = process.env.REDIS_HOST || "127.0.0.1";
  const PORT = process.env.REDIS_PORT || 6379;

  if (process.env.REDIS_AUTH === "true") {
    client.auth(process.env.REDIS_PASS);
  }

  const client = redis.createClient({
    host: HOST,
    port: PORT,
    ttl: 260,
    return_buffers: false,
  });

  client.on('error', () => {
    console.log('[REDIS] Connected to Redis failed!')
  });
  client.once('connect', () => {
    console.log('[REDIS] Connected to Redis success!')
  });
  return client;
};

module.exports = redisConfig;
