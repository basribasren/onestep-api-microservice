const userService = require('../user/user.service.js');
const emailService = require('../email/email.service.js');
const helper = require('../../helpers/user.helper.js');

/**
 * generate data
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
const generateData = (data, role) => {
	return helper.generatePassword(data.password)
		.then((hash) => {
			const user = {
				username: data.username,
				password: hash,
				email: data.email,
				role: role,
			};
			return user;
		})
		.catch((err) => {
			throw new Error('generate data admin failed');
		})
}

const adminController = {
	create: (req, res, next) => {
		generateData(req.body, 'admin')
			.then(data => {
				return userService.create(data)
			})
			.then((admin) => {
				try {
					delete admin.password;
					const jwt = helper.generateToken({ email: admin.email })
					emailService.sendVerifyEmail({
						connection: req.app.get('amqp.connection'),
						channel: req.app.get('amqp.channel'),
						queueName: 'message-queue',
					}, admin.email, jwt)
					return admin
				} catch (err) {
					// if amqp failed then delete the user
					userService.remove(admin.username)
					throw new Error('Create Admin failed : AMQP Error')
				}
			})
			.then(result => {
				res.status(201).send({
					message: 'create admin success',
					data: result,
				});
			})
			.catch(err => next(err));
	},

	update: (req, res, next) => {
		generateData(req.body, 'admin')
			.then((data) => {
				return userService.update(req.params.username, data);
			})
			.then((result) => {
				res.status(201).send({
					message: 'update user success',
					data: result,
				});
			})
			.catch(err => next(err));
	},
}
module.exports = adminController
