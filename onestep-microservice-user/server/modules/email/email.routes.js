const { Router } = require('express');
const emailController = require('./email.controller.js');

const router = Router();
// email/send/change-password
router.post('/send/change-password', emailController.sendResetPassword);
router.post('/send/verify-email', emailController.sendVerifyEmail);

module.exports = router;
