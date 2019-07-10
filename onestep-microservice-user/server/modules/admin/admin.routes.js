const express = require('express');

const router = express.Router();
const adminController = require('./admin.controller.js');
const ACL = require('../../helpers/rbac.helper.js');
const helper = require('../../helpers/auth.helper.js');

// POST /api/v1/admin/
router.post('/', ACL, adminController.create)

// PUT /api/v1/admin/
router.put('/', ACL, adminController.update)

module.exports = router;
