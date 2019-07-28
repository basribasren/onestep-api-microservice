const amqpHelper = require('../../helpers/amqplib.helper.js')

const sendResetPassword = (amqp, email, jwt) => {
	const message = {
		title: 'Reset Password',
		email: email,
		content: {
			message: 'this is email for reset password',
			link: `${process.env.API_PATH}/v1/auth/change-password/${jwt}`,
		},
		type: 'text'
	}
	// send information to message-service by message-queue
	return amqpHelper.send({
			connection: amqp.connection,
			channel: amqp.channel,
			queueName: amqp.queueName,
		}, message)
		.catch(err => {
			throw new Error('Send email reset password failed : AMQP Error')
		})
}

const sendVerifyEmail = (amqp, email, jwt) => {
	const message = {
		title: 'Verify Email',
		email: email,
		content: {
			message: 'this is email for verify email',
			link: `${process.env.API_PATH}/v1/auth/verify-email/${jwt}`,
		},
		type: 'text'
	}
	// send information to message-service by message-queue
	return amqpHelper.send(amqp, message)
		.catch(err => {
			throw new Error('Send email verify email failed : AMQP Error')
		})
}

module.exports = { sendVerifyEmail, sendResetPassword }
