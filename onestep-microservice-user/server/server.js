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
 *  amqp configuration and set as global variabel
 *  ******************************************************************
 */
const amqp = require('./configs/amqplib.config.js');
let connection = amqp.createConnection();
let channel = amqp.createChannel(connection)
let queue = amqp.createQueue(channel, 'message-queue')
app.set('amqp.connection', connection)
app.set('amqp.channel', channel)

/**
 *  ******************************************************************
 *  cek for mysql connection and sync database
 *  ******************************************************************
 */
const mysql = require('./configs/sequelize.config.js')();
const cekSQL = require('./helpers/sequelize.helper.js')
cekSQL.authenticate(mysql)
cekSQL.synchronized(mysql)

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
 *  ******************************************************************
 *  initialize passport
 *  ******************************************************************
 */
const passport = require('./configs/passport.config.js')();
/**
 * initialize passport. this is required, after you set up passport
 * but BEFORE you use passport.session (if using)
 **/
app.use(passport.initialize());
/**
 * only required if using sessions. this will add middleware from passport
 * that will serialize/deserialize the user from the session cookie and add
 * them to req.user
 **###app.use(passport.session());
 */

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
