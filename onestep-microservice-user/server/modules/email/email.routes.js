const { Router } = require('express');
const emailController = require('./email.controller.js');

const router = Router();
// [POST] email/send/change-password
router.post('/send/change-password', emailController.sendResetPassword);

// [POST] email/send/verify-email
router.post('/send/verify-email', emailController.sendVerifyEmail);

module.exports = router;
