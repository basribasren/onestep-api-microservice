import jwt from 'jsonwebtoken'
/**
 * verifiy token by header x-auth-token or session
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const verifyToken = (req, res, next) => {
	try {
		const token = req.session.passport.token;
		if (!token) {
			return res.status(401).send({
				message: 'No token, authorization denied',
				url: req.url,
				method: req.method,
			});
		}
		const data = jwt.verify(token, process.env.SECRET);
		req.user = data.user;
		console.log('verify on token user success...')
		next();
	} catch (err) {
		console.log('verify on token user failed!')
		res.status(401).send({
			message: 'Token is not valid',
			url: req.url,
			method: req.method,
		});
	}
};

/**
 * cek is user admin or not
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export const isAdmin = (req, res, next) => {
	try {
		const role = req.user.role
		if (!role) {
			return res.status(401).send({
				message: 'role not found, authentication denied',
				url: req.url,
				method: req.method,
			})
		}
		if (role === 'admin') {
			next()
		} else {
			return res.status(401).send({
				message: 'role invalid, authentication denied',
				url: req.url,
				method: req.method,
			})
		}
	} catch (err) {
		return res.status(401).send({
			message: 'role not found, authentication denied',
			url: req.url,
			method: req.method,
		})
	}
}
