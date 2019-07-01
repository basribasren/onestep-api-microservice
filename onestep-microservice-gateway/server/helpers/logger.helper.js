const url = require('url');

const logger = (req, res, next) => {
	const path = url.parse(req.baseUrl).pathname
	req.logger.info(`access endpoint ${path} with method ${req.method}`);
	next()
}

module.exports = logger
