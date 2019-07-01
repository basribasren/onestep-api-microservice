/**
 * generate header of message
 * @param  {[type]} from [description]
 * @param  {[type]} to   [description]
 * @param  {[type]} cc   [description]
 * @param  {[type]} bcc  [description]
 * @return {[type]}      [description]
 */
export const headerMessage = (sender, receiver, carbonCopy, blindCarbonCopy) => {
	let from = sender || '"Basri" <basri.official.acc@gmail.com>'
	let to = receiver || 'basri.basreen@gmail.com'
	let cc = carbonCopy || []
	let bcc = blindCarbonCopy || []
	let header = {
		from: from,
		to: to,
	}
	if (cc.length > 0) {
		let addCC = {
			cc: cc,
		}
		header = Object.assign(header, addCC)
	}
	if (bcc.length > 0) {
		let addBCC = {
			bcc: bcc,
		}
		header = Object.assign(header, addBCC)
	}
	return header
}

/**
 * generate body of message
 * @param  {[type]} subject [description]
 * @param  {[type]} text    [description]
 * @param  {[type]} html    [description]
 * @param  {[type]} amp     [description]
 * @return {[type]}         [description]
 */
export const bodyMessage = (subject, content, type = 'text') => {
	let title = subject || '✔ Send Email using Mailgun'
	let body
	if (type === 'html') {
		/**
		 * Send Email with HTML Template
		 * @type {[type]}
		 */
		let html = content || '"<b>Hello world?</b>"'
		body = {
			subject: title,
			html: html,
		}
	} else if (type === 'amp') {
		/**
		 * Send Email with AMP Template
		 * @type {[type]}
		 */
		let amp = content || `'<!doctype html>
		<html ⚡4email>
			<head>
				<meta charset="utf-8">
				<style amp4email-boilerplate>body{visibility:hidden}</style>
				<script async src="https://cdn.ampproject.org/v0.js"></script>
				<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
			</head>
			<body>
				<p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
				<p>GIF (requires "amp-anim" script in header):<br/>
				<amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
			</body>
		</html>'`
		body = {
			subject: title,
			amp: amp,
		}
	} else {
		/**
		 * Send Email with just regural Text
		 * @type {[type]}
		 */
		let text = content || 'This email send using mailgun'
		body = {
			subject: title,
			text: text,
		}
	}

	return body
}

/**
 * generate attachment of message
 * @return {[type]} [description]
 */
export const attachMessage = files => {
	let attachment = files || [{ // utf-8 string as an attachment
			filename: 'text1.txt',
			content: 'hello world!'
		},
		{ // binary buffer as an attachment
			filename: 'text2.txt',
			content: new Buffer('hello world!', 'utf-8')
		},
		{ // file on disk as an attachment
			filename: 'text3.txt',
			path: '/path/to/file.txt' // stream this file
		},
		{
			raw: `Content-Type: text/plain
		Content-Disposition: attachment
		Attached text file`
		}
	]
	let attachments = {
		attachments: attachment
	}
}

/**
 * generate event calender of message
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
export const calenderMessage = event => {
	let content = event || 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...'
	let calenderEvent = {
		icalEvent: {
			filename: 'invitation.ics',
			method: 'request',
			content: content
		}
	}
	return calenderEvent
}

/**
 * wrap all message to one
 * @return {[type]} [description]
 */
export const generateMessage = async data => {
	try {
		let header = headerMessage(data.from, data.to, data.cc, data.bcc)
		let body = bodyMessage(data.title, data.content, data.type)

		let message = Object.assign(header, body)
		return message
	} catch (err) {
		throw new Error('generate message failed!')
	}
}

/**
 * send message
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export const sendMessage = async (transporter, message) => {
	try {
		console.log(transporter)
		let info = await transporter.sendMail(message)
		return info
	} catch (err) {
		throw new Error('send message failed!')
	}
}
