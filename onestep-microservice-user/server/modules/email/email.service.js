const userHelper = require('../../helpers/user.helper.js')
const amqpHelper = require('../../helpers/amqplib.helper.js')

const sendResetPassword = (amqp, email, jwt) => {
	try {
		const jwt = userHelper.generateToken({ email: email })
		const message = {
			title: 'Reset Password',
			email: email,
			content: {
				message: 'this is email for reset password',
				link: `http://localhost:3000/api/v1/auth/change-password/${jwt}`,
			},
			type: 'text'
		}
		// send information to message-service by message-queue
		return amqpHelper.send({
			connection: amqp.connection,
			channel: amqp.channel,
			queueName: 'message-queue',
		}, message)
	} catch (err) {
		throw new Error('Send email reset password failed : AMQP Error')
	}
}

const sendVerifyEmail = (amqp, email, jwt) => {
	try {
		const jwt = userHelper.generateToken({ email: email })
		const message = {
			title: 'Verify Email',
			email: email,
			content: {
				message: 'this is email for verify email',
				link: `http://localhost:3000/api/v1/auth/verify-email/${jwt}`,
			},
			type: 'text'
		}
		// send information to message-service by message-queue
		return amqpHelper.send({
			connection: amqp.connection,
			channel: amqp.channel,
			queueName: 'message-queue',
		}, message)
	} catch (err) {
		throw new Error('Send email verify email failed : AMQP Error')
	}
}

module.exports = { sendVerifyEmail, sendResetPassword }
