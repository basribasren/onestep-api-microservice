const express = require('express');
const router = express.Router();
const userController = require('./user.controller.js');
const ACL = require('../../helpers/rbac.helper.js');
const helper = require('../../helpers/auth.helper.js');

// GET /api/v1/user
router.get('/', helper.verifyToken, ACL, userController.list);

// POST /api/v1/user/
router.post('/', helper.verifyToken, ACL, userController.create);

// GET /api/v1/user/:username
router.get('/:username', helper.verifyToken, ACL, userController.get);

// PUT /api/v1/user/:username
router.put('/:username', helper.verifyToken, ACL, userController.update);

// DELETE /api/v1/user/:username
router.delete('/:username', helper.verifyToken, ACL, userController.remove);


module.exports = router;
