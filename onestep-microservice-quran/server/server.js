const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const listEndpoints = require('express-list-endpoints');

const app = express();
require('dotenv').config();

/**
 *  ******************************************************************
 *  init app and load environment configuration from .env
 *  ******************************************************************
 */
const isProduction = process.env.NODE_ENV === 'production';
const ENABLE_GATEWAY = false

/**
 *  ******************************************************************
 *  check for every single request must have gateway key
 *  ******************************************************************
 */
const gateway = require('./helpers/gateway.helper.js');
if (ENABLE_GATEWAY) {
	app.use(gateway.verifyGateway)
}

/**
 *  ******************************************************************
 *  cek for mysql connection and sync database
 *  ******************************************************************
 */
const mysql = require('./modules/models/index.js');
const cekSQL = require('./helpers/sequelize.helper.js')
cekSQL.authenticate(mysql.sequelize)
cekSQL.synchronized(mysql.sequelize)

/**
 *  ******************************************************************
 *  connection to redis for caching
 *  you need to install, up and running redis
 *  ******************************************************************
 */
const redis = require('./configs/redis.config.js')();
app.set('redis.connection', redis)
/** 
 * Session data is not saved in the cookie itself, just the session ID.
 * Session data is stored server-side 
 **###session(app, redis);
 */

/**
 *  ******************************************************************
 *  init configuration
 *  ******************************************************************
 */
require('./configs/express.config.js')(app);

/**
 * ******************************************************************
 * require routes
 * ******************************************************************
 */
const quran = require('./modules/quran/quran.routes.js')
const translation = require('./modules/translation/translation.routes.js')
const metadata = require('./modules/metadata/metadata.routes.js')

/**
 *  ******************************************************************
 *  routes for all api endpoint
 *  ******************************************************************
 */
app.get('/', (req, res, next) => {
	res.redirect('/api/v1/endpoint')
})

app.get('/api/v1/endpoint', (req, res, next) => {
	const endpoint = listEndpoints(app)
	res.status(200).json({ endpoint })
})

app.get('/api/v1/test', (req, res) => {
	res.status(200).send({
		message: "healty check",
		data: {}
	});
});

app.use('/api/v1/quran', quran)
app.use('/api/v1/translation', translation)
app.use('/api/v1/metadata', metadata)
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
const swagger = require('./configs/swagger.config.js')();
app.get('/api/v1/user-docs.json', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.status(200).send(swagger)
})

app.use('/api/v1/user-docs', serveStatic(path.resolve(__dirname, 'api-docs/swagger-ui'), {
	index: ['index.html', 'index.htm'],
}))

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
	res.status(err.statusCode || 500).json({
		message: err.message,
		status: err.statusCode,
		data: {}
	})
})
module.exports = app
