const path = require('path');
const pino = require('pino');
const pretty = require('pino-pretty');

const logPath = path.resolve(__dirname, '..', 'logs/combine.json');

const pinoConfig = (isProduction) => {
  if (isProduction) {
    /**
     * log to file in path ../logs/combines.json
     * @return {[type]} [description]
     */
    const logger = pino({
      level: 'info',
      timestamp: () => `,"time":"${(new Date()).toISOString()}"`,
    }, pino.destination(logPath));
    return logger;
  }

  /**
   * log to the console with pretty option
   * only use this in development
   * @return {[type]} [description]
   */
  const logger = pino({
    prettyPrint: process.env.NODE_ENV !== 'production',
    prettifier: pretty,
    level: 'info',
    timestamp: () => `,"time":"${(new Date()).toISOString()}"`,
  });
  return logger;
};

module.exports = pinoConfig;
