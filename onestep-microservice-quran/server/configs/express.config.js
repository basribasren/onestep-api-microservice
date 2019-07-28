const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const methodOverride = require('method-override');
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
const responseTime = require('response-time');
const log = require('../helpers/logger.helper.js')
/**
 *  ******************************************************************
 *  express default configuration
 *  ******************************************************************
 */
const init = (app) => {
	try {
		// Compress all responses
		app.use(compression());
		// Request body parsing middleware should be above methodOverride
		app.use(bodyParser.json());
		// Parse application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({ extended: false }));
		// Override with the X-HTTP-Method-Override header in the request
		app.use(methodOverride('X-HTTP-Method-Override'));
		// It will incorrectly register the proxy’s IP address as the client IP address
		// unless trust proxy is configured
		app.set('trust proxy', 1);
		// Allows cross-domain communication from the browser
		app.use(cors());
		// Help secure Express apps with various HTTP headers
		app.use(helmet());
		// Records the response time for requests in HTTP servers {x-response-time →376.293ms}
		app.use(responseTime());

		return app
	} catch (err) {
		log.failed('[Express]', '#EX201', 'Error while trying init express configuration')
		return app
	}
}
module.exports = init
