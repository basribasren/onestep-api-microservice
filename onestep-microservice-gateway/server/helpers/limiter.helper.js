const url = require('url');
const rateLimit = require('express-rate-limit')
const moment = require('moment')

const failCallback = (req, res, next) => {
	let time = moment(req.rateLimit.resetTime).fromNow()
	const path = url.parse(req.baseUrl).pathname
	/**
	 * this is result of console(req)
	 * rateLimit: {
	 * 	limit: 5,
	 * 	current: 6,
	 * 	remaining: 0,
	 * 	resetTime: 2019 - 06 - 11 T07: 31: 59.250 Z
	 * }
	 */
	req.logger.error('too many attempts')
	return res.status(429).send({
		message: `You've made too many failed attempts in a short period of time, please try again ${time}`,
		url: path,
		method: req.method
	})
}

const authLimit = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 500, // limit each IP to 100 requests per windowMs
	handler: failCallback
});

const userLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 500,
	handler: failCallback
});

module.exports = { authLimit, userLimit }
