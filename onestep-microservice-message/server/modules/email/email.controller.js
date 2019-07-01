import { validationResult } from 'express-validator'

import helper from '../../helpers/nodemailer.js'
import nodemailer from '../../configs/nodemailer.config.js'

/**
 * on route, we use express validator
 * and here we check the result of express-validator
 * @param  {[type]} errors [description]
 * @return {[type]}        [description]
 */
const cekValidation = errors => {
	let listError = []
	errors.array().map(err => {
		listError.push(err.msg)
	})
	let newError = new Error(listError)
	return newError
}

/**
 * SEND EMAIL KONFIRMATION - SKENARIO
 * @skenario 1 - take username, email, and urlConfirmation
 * @skenario 2 - generate message that want to send
 * @skenario 3 - send message
 */
export const sendEmailConfirmation = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let newError = cekValidation(errors)
			throw new Error(newError)
		}

		let { receiver, title, content, type } = req.body
		let data = {
			from: '"Basri Basren" <basri.official.acc@gmail.com>',
			to: receiver,
			title: title,
			content: content,
			type: type,
		}
		const transporter = nodemailer.generated()
		let message = await helper.generateMessage(data)
		let info = await helper.sendMessage(transporter, message)

		res.status(200).send({
			message: `Email ${info.messageId} has been send`,
			data: data
		})
	} catch (err) {
		next(err)
	}
}
