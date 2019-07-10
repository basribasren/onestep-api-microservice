const emailService = require('./email.service.js');
const userHelper = require('../../helpers/user.helper.js');

const emailController = {
	/**
	 * user klik link reset password
	 * user memasukkan email yang telah terdaftar
	 * sistem mengirimkan email reset password
	 */
	// [POST] http://localhost:3000/api/v1/email/send/change-password
	sendResetPassword: (req, res, next) => {
		const email = req.body.email
		const jwt = userHelper.generateToken({ email: email })
		emailService.sendResetPassword({
				connection: req.app.get('amqp.connection'),
				channel: req.app.get('amqp.channel'),
				queueName: 'message-queue',
			}, email, jwt)
			.then(() => {
				res.status(201).send({
					message: 'please check your email for reset the password',
					data: {},
				});
			})
			.catch(err => {
				next(new Error('Create User failed : AMQP Error'))
			});
	},
	/**
	 * user sudah melakukan login
	 * namun belum verify akun
	 * user masuk ke halaman setting
	 * mengklik button send verify akun
	 */
	sendVerifyEmail: (req, res, next) => {
		const email = req.body.email
		const jwt = userHelper.generateToken({ email: email })
		emailService.sendVerifyEmail({
				connection: req.app.get('amqp.connection'),
				channel: req.app.get('amqp.channel'),
				queueName: 'message-queue',
			}, email, jwt)
			.then(() => {
				res.status(201).send({
					message: 'please check your email for verify the akun',
					data: {},
				});
			})
			.catch(err => {
				next(new Error('Create User failed : AMQP Error'))
			});
	}
}
module.exports = emailController
