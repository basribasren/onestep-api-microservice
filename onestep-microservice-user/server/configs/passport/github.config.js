const GitHubStrategy = require('passport-github').Strategy;

module.exports = function (passport, userService, helper) {
	passport.use(new GitHubStrategy({
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: `${process.env.API_PATH}/v1/auth/github/callback`,
		},
		function (accessToken, refreshToken, profile, done) {
			// _json:
			// {
			// 	login: 'basribasren',
			// 	id: 25193994,
			// 	node_id: 'MDQ6VXNlcjI1MTkzOTk0',
			// 	type: 'User',
			// 	...
			// 	name: 'Basri Basren',
			// 	company: 'Onestep',
			// 	blog: 'https://basribasreen.herokuapp.com',
			// 	location: 'Indonesia',
			// 	email: 'basri.official.acc@gmail.com',
			// 	...
			// 	created_at: '2017-01-18T06:41:10Z',
			// 	updated_at: '2019-06-11T14:08:31Z'
			// }
			const data = {
				username: profile._json.login,
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
