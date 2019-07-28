const jwt = require('jsonwebtoken');
const url = require('url');

const gateway = {}
/**
 * generate token with user account
 * expiresIn Eg: 60, "2 days", "10h", "7d"
 */
gateway.generateKey = (app) => {
	const key = jwt.sign({ app }, process.env.GATE_SECRET, { expiresIn: '7d' });
	return key;
};

/**
 * verifiy token by header x-auth-token or session
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
gateway.verifyKey = (req, res, next) => {
	const path = url.parse(req.baseUrl).pathname
	try {
		const key = req.query.key;
		if (!key) {
			req.logger.error('No key, authorization denied')
			return res.status(401).send({
				message: 'No key, authorization denied',
				url: path,
				method: req.method,
			});
		}
		const data = jwt.verify(key, process.env.GATE_SECRET);
		next();
	} catch (err) {
		req.logger.error('Key is not valid')
		return res.status(401).send({
			message: 'Key is not valid',
			url: path,
			method: req.method,
		});
	}
};

module.exports = gateway
