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
	get: (req, res, next) => {
		const client = req.app.get('redis.connection')
		const key = `admin:get:${req.params.username}`;
		client.get(key, (err, result) => {
			if (result) {
				const admin = JSON.parse(result)
				delete admin.password
				return res.status(200).send({
					message: 'get detail admin success',
					data: admin,
				});
			} else {
				userService.get(req.params.username)
					.then((result) => {
						delete result.password;
						client.setex(key, 3600, JSON.stringify(result))
						res.status(200).send({
							message: 'get detail admin success',
							data: result,
						});
					})
					.catch(err => next(err));
			}
		})
	},

	list: (req, res, next) => {
		const client = req.app.get('redis.connection')
		const key = `admin:list`;
		client.get(key, (err, result) => {
			if (result) {
				const filter = JSON.parse(result).map(admin => {
					delete admin.password
					return admin
				})
				return res.status(200).send({
					message: 'get list admin success',
					data: filter,
				});
			} else {
				userService.list('admin')
					.then((users) => {
						const filter = users.map(admin => {
							delete admin.password
							return admin
						})
						return filter
					})
					.then((result) => {
						client.setex(key, 3600, JSON.stringify(result))
						res.status(200).send({
							message: 'get list admin success',
							data: result,
						});
					})
					.catch(err => next(err));
			}
		})
	},

	create: (req, res, next) => {
		generateData(req.body, 'admin')
			.then(data => {
				return userService.create(data)
			})
			.then((admin) => {
				delete admin.password;
				const jwt = helper.generateToken({ email: admin.email })
				return emailService.sendVerifyEmail({
						connection: req.app.get('amqp.connection'),
						channel: req.app.get('amqp.channel'),
						queueName: 'message-queue',
					}, admin.email, jwt)
					.then(() => {
						return admin
					})
					.catch(err => {
						// if amqp failed then delete the user
						userService.remove(user.username)
						throw err
					})
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
					message: 'update admin success',
					data: result,
				});
			})
			.catch(err => next(err));
	},

	remove: (req, res, next) => {
		userService.remove(req.params.username)
			.then(result => {
				res.status(201).send({
					message: 'remove admin success',
					data: result,
				});
			})
			.catch(err => next(err));
	},
}
module.exports = adminController
