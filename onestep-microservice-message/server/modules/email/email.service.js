import * as helper from '../../helpers/nodemailer.js'
import nodemailer from '../../configs/nodemailer.config.js'

const send = async (amqpData) => {
	try {
		let data = {
			from: '"Basri Basren" <basri.official.acc@gmail.com>',
			to: amqpData.email,
			title: amqpData.title,
			content: amqpData.content,
			type: amqpData.type,
		}
		const transporter = nodemailer.generated()
		let message = await helper.generateMessage(data)
		// let info = await helper.sendMessage(transporter, message)
		let result = {
			message: 'Email ${info.messageId} has been send',
			data: data,
		}
		return console.log(result)
	} catch (err) {
		return console.log(err)
	}
}

export default { send }
