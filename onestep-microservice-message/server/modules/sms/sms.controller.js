import { validationResult } from 'express-validator'
import * as helper from '../../helpers/twilio.helper.js'

const cekValidation = errors => {
	let listError = []
	errors.array().map(err => {
		listError.push(err.msg)
	})
	let newError = new Error(listError)
	return newError
}

export const sendSMSConfirmation = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let newError = cekValidation(errors)
			throw new Error(newError)
		}
		let { receiver, message } = req.body
		let data = {
			from: '+12345678901',
			to: receiver,
			body: message,
		}
		const messages = await helper.sendSMS(data)

		res.status(200).send({
			message: `Email ${messages} has been send`,
			data: message
		})
	} catch (err) {
		next(err)
	}
}

export default sendSMSConfirmation
