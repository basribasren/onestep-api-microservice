const proxy = require('http-proxy-middleware');
const limiter = require('../helpers/limiter.helper.js');
const logger = require('../helpers/logger.helper.js');

const userService = (app, token) => {
	try {
		const userProxy = proxy({
			target: process.env.USER_PATH,
			changeOrigin: true,
			logLevel: 'debug',
			onProxyReq: (proxyReq, req) => {
				proxyReq.setHeader('x-gateway-key', token)
				if (req.body) {
					const bodyData = JSON.stringify(req.body);
					proxyReq.setHeader('Content-Type', 'application/json');
					proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
					proxyReq.write(bodyData);
				}
			},
			onProxyRes: (proxyRes, req, res) => {
				console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2)); // proxy header
			}
		});
		app.use('/api/v1/user', limiter.userLimit, logger, userProxy);
		app.use('/api/v1/auth', limiter.userLimit, logger, userProxy);
	} catch (err) {
		console.log('Error while trying proxy the user service')
		return
	}
}
module.exports = userService
