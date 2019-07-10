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

/**
 *  ******************************************************************
 *  check for every single request must have gateway key
 *  ******************************************************************
 */
const gateway = require('./helpers/gateway.helper.js');
if (isProduction) {
	app.use(gateway.verifyGateway)
}

/**
 *  ******************************************************************
 *  init configuration
 *  ******************************************************************
 */
const mysql = require('./configs/sequelize.config.js')();
const redis = require('./configs/redis.config.js')();
const swagger = require('./configs/swagger.config.js')();
const passport = require('./configs/passport.config.js')();
const amqp = require('./configs/amqplib.config.js');
require('./configs/express.config.js')(app, redis, passport);

/**
 *  ******************************************************************
 *  amqp configuration and set as global variabel
 *  ******************************************************************
 */
let connection = amqp.createConnection();
let channel = amqp.createChannel(connection)
let queue = amqp.createQueue(channel, 'message-queue')

app.set('amqp.connection', connection)
app.set('amqp.channel', channel)

/**
 * ******************************************************************
 * require routes
 * ******************************************************************
 */
const user = require('./modules/user/user.routes.js');
const admin = require('./modules/admin/admin.routes.js');
const auth = require('./modules/auth/auth.routes.js');
const email = require('./modules/email/email.routes.js');

/**
 *  ******************************************************************
 *  cek for mysql connection and sync database
 *  ******************************************************************
 */
const cekSQL = require('./helpers/sequelize.helper.js')
cekSQL.authenticate(mysql)
cekSQL.synchronized(mysql)

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

app.use('/api/v1/user', user); // ['GET', 'POST', 'PUT', 'DELETE']
app.use('/api/v1/admin', admin); // ['POST', PUT]
app.use('/api/v1/auth', auth);
app.use('/api/v1/email', email);

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
