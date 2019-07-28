import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import methodOverride from 'method-override'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import responseTime from 'response-time'

const expressConfig = (app, log) => {
	try {
		// Compress all responses
		app.use(compression())
		// Request body parsing middleware should be above methodOverride
		app.use(bodyParser.json())
		// Parse application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({ extended: false }))
		// Override with the X-HTTP-Method-Override header in the request
		app.use(methodOverride('X-HTTP-Method-Override'))
		// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
		app.use(cookieParser())
		// It will incorrectly register the proxy’s IP address as the client IP address unless trust proxy is configured
		app.set('trust proxy', 1)
		// Allows cross-domain communication from the browser
		app.use(cors())
		// disable x-powered-by
		app.disable('x-powered-by')
		// Help secure Express apps with various HTTP headers
		app.use(helmet())
		// Records the response time for requests in HTTP servers {x-response-time →376.293ms}
		app.use(responseTime())

		return app
	} catch (err) {
		log.failed('[Express]', '#EX201', 'Error while trying init express configuration')
		return app
	}
}
export default expressConfig
