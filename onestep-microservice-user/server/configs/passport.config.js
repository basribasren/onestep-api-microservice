const passport = require('passport');
const jwt = require('jsonwebtoken');
const log = require('../helpers/logger.helper.js')

const passportConfig = function () {
	try {
		const userService = require('../modules/user/user.service.js');
		const helper = require('../helpers/user.helper.js');
		/**
		 *  ******************************************************************
		 *  require strategy configuration
		 *  ******************************************************************
		 */
		require('./passport/local.config.js')(passport, userService, helper);
		require('./passport/basic.config.js')(passport, userService, helper);
		require('./passport/github.config.js')(passport, userService, helper);
		require('./passport/facebook.config.js')(passport, userService, helper);
		require('./passport/google.config.js')(passport, userService, helper);
		/**
		 * Only necessary when using sessions.
		 * This tells Passport how or what data to save about a user in the session cookie.
		 * It's recommended you only serialize something like a unique username or user ID.
		 * I prefer user ID.
		 */
		passport.serializeUser((token, done) => {
			done(null, token);
		});

		/**
		 * Only necessary when using sessions.
		 * This tells Passport how to turn the user ID we serialize in the session cookie
		 * back into the actual User record from our Mongo database.
		 * Here, we simply find the user with the matching ID and return that.
		 * This will cause the User record to be available on each authenticated request 
		 * via the req.user property.
		 */
		passport.deserializeUser((token, done) => {
			const data = jwt.verify(token, process.env.TOKEN_SECRET);
			const id = data.user.id;
			userService.getById(id)
				.then((user) => {
					done(null, user);
				})
				.catch((err) => {
					throw new Error(err)
				});
		});
		return passport
	} catch (err) {
		log.failed('[Passport]', '#EX202', 'Error while trying create passport configuration')
		return passport
	}
}
module.exports = passportConfig
