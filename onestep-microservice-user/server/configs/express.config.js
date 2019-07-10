const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const methodOverride = require('method-override');
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
const responseTime = require('response-time');

/**
 *  ******************************************************************
 *  express default configuration
 *  ******************************************************************
 */
const init = (app, connection, passport) => {
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
		/** 
		 * Session data is not saved in the cookie itself, just the session ID.
		 * Session data is stored server-side 
		 **###session(app, connection);
		 */
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
		return app
	} catch (err) {
		console.log('[Express] Error while trying init express configuration')
		return app
	}
}
module.exports = init
