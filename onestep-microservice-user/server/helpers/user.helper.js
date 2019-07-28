const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * generate hash of password
 * return promises pending
 */
const generatePassword = (password) => {
	const hash = bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(password, salt))
		.catch(err => err);
	return hash;
};

/**
 * compare password input with hash result
 * return promise pending
 */
const comparePassword = (password, hash) => bcrypt.compare(password, hash);

/**
 * generate token with user account
 * expiresIn Eg: 60, "2 days", "10h", "7d"
 */
const generateToken = (user) => {
	const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
	return token;
};

const verifyToken = (data) => {
	try {
		const user = jwt.verify(data, process.env.TOKEN_SECRET);
		return user
	} catch (err) {
		throw new Error('verify token failed')
	}
}

module.exports = {
	generatePassword,
	comparePassword,
	generateToken,
	verifyToken
};
