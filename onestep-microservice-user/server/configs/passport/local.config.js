const LocalStrategy = require('passport-local').Strategy

module.exports = (passport, userService, helper) => {
	passport.use(new LocalStrategy((username, password, done) => {
		let dataUser = {};
		userService.get(username)
			.then((account) => {
				if (!account) {
					throw new Error(`user with ${username} is not found`);
				}
				dataUser = account;
				return helper.comparePassword(password, account.password);
			})
			.then((isMatch) => {
				if (isMatch) {
					delete dataUser.password;
					const token = helper.generateToken(dataUser);
					return done(null, token);
				} else {
					const err = new Error('password not match... login failed!');
					return done(err)
					// return done(null, false, { message: 'password not match... login failed!' });
				}
			})
			.catch(err => {
				return done(err)
			});
	}));
	return passport
}
