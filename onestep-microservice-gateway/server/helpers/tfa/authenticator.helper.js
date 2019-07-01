/**
 * Instance of Authenticator: Google Authenticator library
 * authenticator.generate(...)
 * authenticator.check(...)
 * authenticator.generateSecret(...)
 */
const authenticator = require('otplib/authenticator')
const crypto = require('crypto')

authenticator.options = {
	step: 30, //Time step (seconds)
	window: 1,
	crypto
};

const Authenticator = {
	generatedSecret: () => {
		const secret = authenticator.generateSecret();
		return secret
	},
	generatedToken: (secret) => {
		return authenticator.generate(secret);
	},
	getTime: () => {
		return authenticator.timeUsed()
	},
	getTimeRemaining: () => {
		return authenticator.timeRemaining()
	},
	checkToken: (token, secret) => {
		return authenticator.check(token, secret)
	}
}
module.exports = Authenticator
