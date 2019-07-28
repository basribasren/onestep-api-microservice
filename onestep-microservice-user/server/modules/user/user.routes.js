const express = require('express');

const router = express.Router();
const userController = require('./user.controller.js');
const ACL = require('../../helpers/rbac.helper.js');
const helper = require('../../helpers/auth.helper.js');

/**
 * [GET] /api/v1/user for get list user
 * must have token on query /user?token=<jwt>
 * the one who can access this, just an admin
 * will check ACL, if not admin then access restricted 
 */
router.get('/list', helper.verifyToken, ACL, userController.list);

/**
 * [POST] /api/v1/user/ for create new user
 */
router.post('/', userController.create);

/**
 * [GET] /api/v1/user/:username for get detail user
 * must have token on query /user?token=<jwt>
 * will check ACL, if not own then access restricted
 */
router.get('/:username', helper.verifyToken, ACL, userController.get);

/**
 * [PUT] /api/v1/user/:username for update detail user
 * must have token on query /user?token=<jwt>
 * will check ACL, if not own then access restricted
 */
router.put('/:username', helper.verifyToken, ACL, userController.update);

/**
 * [DELETE] /api/v1/user/:username for delete user
 * must have token on query /user?token=<jwt>
 * will check ACL, if not own then access restricted
 */
router.delete('/:username', helper.verifyToken, ACL, userController.remove);

module.exports = router;
