import { validationResult } from 'express-validator'

const cekValidation = errors => {
	let listError = []
	errors.array().map(err => {
		listError.push(err.msg)
	})
	let newError = new Error(listError)
	return newError
}

const sendSMS = (twilio, data) => {
	console.log(twilio)
	return twilio.messages.create(data)
		.then((message) => {
			return message
		})
		.catch(err => {
			throw new Error('sending email failed!' + err)
		})
}

export const sendSMSConfirmation = async (req, res, next) => {
	try {
		const twilio = req.twilio
		const errors = validationResult(req)
		// if (!errors.isEmpty()) {
		// 	let newError = cekValidation(errors)
		// 	throw new Error(newError)
		// }
		// let { receiver, message } = req.body
		// let data = {
		// 	from: '+12345678901',
		// 	to: receiver,
		// 	body: message,
		// }
		let data = {
			from: '+12566671546',
			to: '+6282335888691',
			body: 'Hello',
		}
		const messages = await sendSMS(twilio, data)

		res.status(200).send({
			message: `Email ${messages} has been send`,
			data: messages,
		})
	} catch (err) {
		next(err)
	}
}

WA one way messaging
const accountSid = 'ACce538afc6de21ce75153fb709e648166';
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);

client.messages
	.create({
		body: 'Your Twilio code is 1238432',
		from: 'whatsapp:+14155238886',
		to: 'whatsapp:+6285252235802'
	})
	.then(message => console.log(message.sid))
	.done();

response

{
	"sid": "SM1766679228a74918ac7837ac33a98d24",
	"date_created": "Mon, 01 Jul 2019 14:51:27 +0000",
	"date_updated": "Mon, 01 Jul 2019 14:51:27 +0000",
	"date_sent": null,
	"account_sid": "ACce538afc6de21ce75153fb709e648166",
	"to": "whatsapp:+6285252235802",
	"from": "whatsapp:+14155238886",
	"messaging_service_sid": null,
	"body": "Your Twilio code is 1238432",
	"status": "queued",
	"num_segments": "1",
	"num_media": "0",
	"direction": "outbound-api",
	"api_version": "2010-04-01",
	"price": null,
	"price_unit": null,
	"error_code": null,
	"error_message": null,
	"uri": "/2010-04-01/Accounts/ACce538afc6de21ce75153fb709e648166/Messages/SM1766679228a74918ac7837ac33a98d24.json",
	"subresource_uris": {
		"media": "/2010-04-01/Accounts/ACce538afc6de21ce75153fb709e648166/Messages/SM1766679228a74918ac7837ac33a98d24/Media.json"
	}
}




export default sendSMSConfirmation
