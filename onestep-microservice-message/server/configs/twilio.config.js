import twilio from 'twilio'

const twilioConfig = (isProduction, log) => {
	try {
		if (isProduction) {
			const client = new twilio(process.env.TWILIO_LIVE_SID, process.env.TWILIO_LIVE_TOKEN);
			log.success('[Twilio]', 'success connect to twilio with production mode')
			return client
		} else {
			const client = new twilio(process.env.TWILIO_TEST_SID, process.env.TWILIO_TEST_TOKEN);
			log.success('[Twilio]', 'success connect to twilio with development mode')
			return client
		}
	} catch (err) {
		return log.error('[Twilio]', '#209', 'failed connect to twilio')
	}
}

export default twilioConfig
