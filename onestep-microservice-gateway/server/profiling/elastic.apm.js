// Add this to the VERY top of the first 
// file loaded in your app
const apm = require('elastic-apm-node')

const running = (isProduction, logger) => {
	try {
		if (!isProduction) {
			apm.start({
				// Override service name from package.json 
				// Allowed characters: a-z, A-Z, 0-9, -, _, 
				// and space
				serviceName: process.env.AMP_SERVICE,

				// Use if APM Server requires a token
				secretToken: '',

				// Set custom APM Server URL
				// Default: http://localhost:8200
				serverUrl: process.env.AMP_URL,
				logger: logger
			})
		}
	} catch (err) {
		return apm.captureError(logger.error('APM Error:' + err.message))
	}
}


module.exports = running
