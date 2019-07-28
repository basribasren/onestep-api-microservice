const express = require('express');

const router = express.Router();
const adminController = require('./admin.controller.js');
const ACL = require('../../helpers/rbac.helper.js');
const helper = require('../../helpers/auth.helper.js');

// [GET] /api/v1/admin
router.get('/list', helper.verifyToken, ACL, adminController.list);

// [POST] /api/v1/admin/
router.post('/', helper.verifyToken, ACL, adminController.create);

// [GET] /api/v1/admin/:username
router.get('/:username', helper.verifyToken, ACL, adminController.get);

// [PUT] /api/v1/admin/:username
router.put('/:username', helper.verifyToken, ACL, adminController.update);

// [DELETE] /api/v1/admin/:username
router.delete('/:username', helper.verifyToken, ACL, adminController.remove);

module.exports = router;
