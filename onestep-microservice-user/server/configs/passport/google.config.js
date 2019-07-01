const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport, userService, helper) {
	passport.use(new GoogleStrategy({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `${process.env.API_PATH}/v1/auth/google/callback`,
		},
		function (accessToken, refreshToken, profile, done) {
			// _json:
			// {
			// 	sub: '104047142913419639930',
			// 	name: 'Basri Basren',
			// 	given_name: 'Basri',
			// 	family_name: 'Basren',
			// 	picture: 'https://lh5.googleusercontent.com/-RASNdqCDgfI/AAAAAAAAAAI/AAAAAAAAAAs/6Z049T1FJ2Q/photo.jpg',
			// 	email: 'basri.basreen@gmail.com',
			// 	email_verified: true,
			// 	locale: 'en'
			// }
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
