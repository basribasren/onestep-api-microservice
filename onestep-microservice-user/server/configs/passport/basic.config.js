const BasicStrategy = require('passport-http').BasicStrategy

module.exports = (passport, userService, helper) => {
	passport.use(new BasicStrategy((userid, password, done) => {
		userService.get(userid)
			.then((account) => {
				if (!account) {
					throw new Error(`user with ${userid} is not found`);
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
