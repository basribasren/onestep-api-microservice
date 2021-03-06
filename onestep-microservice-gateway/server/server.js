const express = require('express');
const path = require('path');
const uuidv1 = require('uuid/v1');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const gateway = require('./configs/gateway.config.js');

const app = express();
/**
 *  ******************************************************************
 *  load environment configuration from .env
 *  ******************************************************************
 */
require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const randomNumber = uuidv1();
const GATEWAY_TOKEN = gateway.generateKey(randomNumber);
const ENABLE_AMP = false;
const ENABLE_REDIS = true;

/**
 *  ******************************************************************
 *  set pino as middleware
 *  ******************************************************************
 */
const logger = require('./configs/pino.config.js')(isProduction);
app.use((req, res, next) => {
	req.logger = logger;
	next();
});

/**
 * ******************************************************************
 * set application performance monitoring (APM) with elastichsearch
 * if you want to enable this feature, you need prepare this:
 * # install, up and running elastichsearch
 * # install, up and running kibana
 * # install, up and running apm-server
 * ******************************************************************
 */
const apm = require('./profiling/elastic.apm.js')(logger, ENABLE_AMP);

/**
 *  ******************************************************************
 *  connnection to redis for caching
 *  if you want to enable this feature, you need prepare this:
 *  install, up and running redis
 *  ******************************************************************
 */
const redis = require('./configs/redis.config.js')(logger, ENABLE_REDIS);

/**
 *  ******************************************************************
 *  set init express configuration
 *  ******************************************************************
 */
require('./configs/express.config.js')(app);

/**
 *  ******************************************************************
 *  set session with store redis
 *  Session data is not saved in the cookie itself, just the session ID.
 *  Session data is stored server-side
 *  ******************************************************************
 */
const session = require('./configs/session.config.js')(app, redis);

/**
 *  ******************************************************************
 *  set redirect from /
 *  ******************************************************************
 */
app.get('/', (req, res, next) => {
	res.redirect('/api/v1/swagger')
})
require('./service/user.service.js')(app, GATEWAY_TOKEN);

/**
 *  ******************************************************************
 *  static folder for client
 *  ******************************************************************
 */
app.get('/robots.txt', (req, res) => {
	res.type('text/plain');
	res.send('User-agent: *\nDisallow: /');
});
app.use(serveStatic(path.resolve(__dirname, '..', 'client/dist'), {
	index: ['index.html', 'index.htm'],
}));
app.use(favicon(path.join(__dirname, '..', 'client/dist', 'favicon.ico')));

/**
 *  ******************************************************************
 *  generate configuration and routes for API documentation
 *  ******************************************************************
 */
const swaggerDefault = require('./configs/swagger.config.js')();
const swaggerHelper = require('./helpers/swagger.helper.js');

/**
 * publish swagger definition after merge
 */
app.get('/api/v1/swagger.json', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	swaggerHelper.getAndMerge(swaggerDefault)
		.then(swagger => {
			res.send(swagger);
		})
		.catch(err => {
			res.send(swaggerDefault)
		})
});
app.use('/api/v1/swagger', serveStatic(path.resolve(__dirname, 'api-docs/swagger-ui'), {}));

/**
 * error handler when url not found
 * @param  {[type]} res   [description]
 */
app.use(function (req, res, next) {
	let err = new Error('Resource not found');
	err.statusCode = 404;
	next(err)
})

/**
 * error handler for all request error
 * @param  {[type]} req   [description]
 */
app.use(function (err, req, res, next) {
	logger.error('Error Handling: Error on' + err.message)
	res.status(err.statusCode || 500).json({
		message: err.message,
		status: err.statusCode,
		data: {}
	})
})

module.exports = app
