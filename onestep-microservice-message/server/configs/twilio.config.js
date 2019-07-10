import twilio from 'twilio'

const twilioConfig = (isProduction) => {
	try {
		console.log(isProduction)
		if (isProduction) {
			const client = new twilio(process.env.TWILIO_LIVE_SID, process.env.TWILIO_LIVE_TOKEN);
			console.log('[Twilio] connection to twilio (prod) success...')
			return client
		} else {
			const client = new twilio(process.env.TWILIO_TEST_SID, process.env.TWILIO_TEST_TOKEN);
			console.log('[Twilio] connection to twilio success...')
			return client
		}
	} catch (err) {
		throw new Error('[Twilio] connection to twilio failed!')
	}
}

export default twilioConfig
