import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
/**
 * send e-mails from Node.js – easy as cake! 🍰✉️
 * using nodemailer-mailgun-transport with nodemailer to send email using Mailgun's awesomeness! 
 * @return {[type]} [description]
 */
const generated = () => {
	try {
		let auth = {
			auth: {
				api_key: process.env.MAILGUN_API_KEY,
				domain: process.env.MAILGUN_DOMAIN,
			},
		}
		let transporter = nodemailer.createTransport(mg(auth))
		console.log('generate transporter success')
		return transporter
	} catch (err) {
		console.log('generate transporter failed')
		return
	}
}

/**
 * when transporter in idle stat
 * @param  {[type]} transporter [description]
 * @return {[type]}             [description]
 */
const idle = transporter => {
	try {
		transporter.on('idle', function() {
			while (transporter.isIdle() && messages.length) {
				transporter.sendMail(messages.shift())
			}
		})
	} catch (err) {
		return
	}
}

export default {
	generated,
	idle
}
