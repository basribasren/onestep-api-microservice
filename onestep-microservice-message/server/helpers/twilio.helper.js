import twilioConfig from '../configs/twilio.config.js'
const isProduction = process.env.NODE_ENV === 'production'

const twilio = twilioConfig(isProduction)

export const sendSMS = (data) => {
	return twilio.messages.create(data)
		.then((message) => {
			return message
		})
		.catch(err => {
			throw new Error('sending email failed!' + err)
		})
}
