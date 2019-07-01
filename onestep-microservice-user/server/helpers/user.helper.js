const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userHelper = {};
/**
 * generate hash of password
 * return promises pending
 */
userHelper.generatePassword = (password) => {
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
userHelper.comparePassword = (password, hash) => bcrypt.compare(password, hash);

/**
 * generate token with user account
 * expiresIn Eg: 60, "2 days", "10h", "7d"
 */
userHelper.generateToken = (user) => {
	const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
	return token;
};

module.exports = userHelper;
