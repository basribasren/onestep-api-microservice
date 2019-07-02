import twilio from 'twilio'

const twilioConfig = (isProduction) => {
	try {
		console.log(isProduction)
		if (isProduction) {
			const client = new twilio(process.env.TWILIO_LIVE_SID, process.env.TWILIO_LIVE_TOKEN);
			return client
		} else {
			const client = new twilio(process.env.TWILIO_TEST_SID, process.env.TWILIO_TEST_TOKEN);
			return client
		}
	} catch (err) {
		throw new Error('connection to twilio failed!')
	}
}

export default twilioConfig
