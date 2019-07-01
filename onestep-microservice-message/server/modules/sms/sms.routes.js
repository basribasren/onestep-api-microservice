import { Router } from 'express'
import { check, oneOf } from 'express-validator'
import * as smsController from './sms.controller.js'
import * as helper from '../../helpers/auth.helper.js'
const router = Router()

router.get('/send',
	// helper.verifyToken,
	[
		check('receiver').not().isEmpty().withMessage('receiver is required'),
		check('message').not().isEmpty().withMessage('message is required')
	],
	smsController.sendSMSConfirmation
)
export default router
