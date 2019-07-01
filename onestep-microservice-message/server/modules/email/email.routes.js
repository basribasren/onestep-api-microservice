import { Router } from 'express'
import { check, oneOf } from 'express-validator'
import * as emailController from './email.controller.js'
import * as helper from '../../helpers/auth.helper.js'
const router = Router()

/**
 * POST SEND EMAIL - SKENARIO
 * akan mengirim email
 * ketika user telah register
 * maka event ini akan di trigger
 * coba pelajari cara gunaakn rabbit mq sebagai trigger
 */
router.post('/send',
	// helper.verifyToken,
	[
		check('receiver')
		.not().isEmpty().withMessage('receiver is required')
		.isEmail().withMessage('receiver is must email'),
		check('title')
		.not().isEmpty().withMessage('title is required')
		.isString().withMessage('title must be string'),
		check('type')
		.isIn(['html', 'amp', 'text'])
	],
	emailController.sendEmailConfirmation
)

export default router
