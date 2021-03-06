const jwt = require('jsonwebtoken');

/**
 * verifiy token by header x-auth-token or session
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const verifyToken = (req, res, next) => {
	const token = req.query.token;
	if (!token) {
		return res.status(401).send({
			message: 'No token, authorization denied',
			url: req.baseUrl,
			method: req.method,
		});
	}
	try {
		const data = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = data.user;
		next();
	} catch (err) {
		res.status(401).send({
			message: 'Token is not valid',
			url: req.baseUrl,
			method: req.method,
		});
	}
};

module.exports = { verifyToken };
