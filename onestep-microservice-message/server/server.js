import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import serveStatic from 'serve-static'
import dotenv from 'dotenv'
/** import configurations */
import mongoose from './configs/mongoose.config.js'
import swagger from './configs/swagger.config.js'
import init from './configs/express.config.js'
/** import routes */
import email from './modules/email/email.routes.js'
import sms from './modules/sms/sms.routes.js'
/** import helpers */
import gateway from './helpers/gateway.helper.js'

const app = express()

/**
 *  ******************************************************************
 *  load environment configuration from .env
 *  ******************************************************************
 */
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

/**
 *  ******************************************************************
 *  check for every single request must have gateway key
 *  ******************************************************************
 */
if (isProduction) {
	app.use(gateway.verifyGateway)
}

/**
 *  ******************************************************************
 *  connection to database mongodb using mongoose
 *  ******************************************************************
 */
const mongooseConnection = mongoose()

/**
 *  ******************************************************************
 *  set variabel
 *  ******************************************************************
 */
const STATIC_FOLDER = 'client/dist'
const STATIC_SWAGGER = 'api-docs/swagger-ui'

/**
 *  ******************************************************************
 *  express default configuration
 *  ******************************************************************
 */
init(app)

/**
 *  ******************************************************************
 *  static folder for client
 *  ******************************************************************
 */
app.get('/robots.txt', (req, res) => {
	res.type('text/plain')
	res.send('User-agent: *\nDisallow: /')
})
app.use(serveStatic(path.resolve(__dirname, STATIC_FOLDER), {
	'index': ['index.html', 'index.htm']
}))
if (process.env.APP_ENV === 'production') {
	app.use(favicon(path.join(__dirname, 'client/dist', 'favicon.ico')))
}

/**
 *  ******************************************************************
 *  generate configuration and routes for API documentation
 *  ******************************************************************
 */
const config = swagger()
app.get('/api/v1/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(config)
})
app.use('/api/v1/swagger', serveStatic(path.resolve(__dirname, STATIC_SWAGGER)))

/**
 *  ******************************************************************
 *  routes for all api endpoint
 *  ******************************************************************
 */
app.use('/api/v1/email', email)
app.use('/api/v1/sms', sms)

/**
 * error handler when url not found
 * @param  {[type]} res   [description]
 */
app.use((req, res, next) => {
	let err = new Error('Resource not found')
	err.statusCode = 404
	next(err)
})

/**
 * error handler for all request error
 * @param  {[type]} req   [description]
 */
app.use((err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		message: err.message,
		status: err.statusCode,
		data: {},
	})
})

export default app
