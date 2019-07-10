const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport, userService, helper) {
	passport.use(new FacebookStrategy({
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: `${process.env.API_PATH}/v1/auth/facebook/callback`,
			profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name']
		},
		function (accessToken, refreshToken, profile, done) {
			// console.log(accessToken)
			// console.log(refreshToken)
			// console.log(profile)
			/** _json:
			{
				id: '690592054687733',
				name: 'Basri Offi',
				email: 'basri.official.acc@gmail.com',
				first_name: 'Basri',
				last_name: 'Offi'
			}
			*/
			const data = {
				username: profile._json.email,
				email: profile._json.email,
			}
			userService.findOrCreate(data)
				.then(user => {
					delete user.password;
					const token = helper.generateToken(user);
					return done(null, token);
				})
				.catch(err => {
					return done(err)
				});
		}
	));
	return passport
}
