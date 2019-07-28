const passport = require('passport');
const { Router } = require('express');
const authController = require('./auth.controller.js');

const router = Router();

// [POST] /api/v1/auth/change-password/:jwt
router.post('/change-password/:jwt', authController.changePassword);

// [POST] /api/v1/auth/verify-email/:jwt
router.post('/verify-email/:jwt', authController.verifyEmail);

// [POST] /api/v1/auth/login
router.post('/login', authController.login);

// [POST] /api/v1/auth/add
router.post('/logout', authController.logout);

// [POST] /api/v1/auth/local
router.post('/local', passport.authenticate('local'),
	function (req, res) {
		res.status(200).send({
			message: 'login success',
			data: {
				token: req.user
			},
		});
	});

router.get('/basic', passport.authenticate('basic', { session: false }),
	function (req, res) {
		res.status(200).send({
			message: 'login success',
			data: {
				token: req.user
			},
		});
	});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github'),
	function (req, res) {
		res.status(200).send({
			message: 'login success',
			data: req.session,
		});
	});

router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook'),
	function (req, res) {
		res.status(200).send({
			message: 'login success',
			data: req.session,
		});
	});


router.get('/google', passport.authenticate('google', {
	scope: [
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile',
	]
}));

router.get('/google/callback', passport.authenticate('google'),
	function (req, res) {
		res.status(200).send({
			message: 'login success',
			data: req.session,
		});
	});


module.exports = router;
