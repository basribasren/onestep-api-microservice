/**
 * RBAC (Role Based Access Control) — 
 * tries to solve the limitations of IBAC management in large systems 
 * by mimicking the real world needs more closely. 
 * Operational privileges are grouped into roles and each user is assigned a role. 
 * The role, instead of the individual, is the basis for access checks. 
 * It is often implemented in a hierarchical model, 
 * where higher level roles inherit the privileges from lower levels. 
 * RBAC sacrifices granularity for higher maintainability in systems with lots of users.
 */
const url = require('url');
const AccessControl = require('accesscontrol');
const grantsObject = require('../configs/acl.config.js')

const rbac = new AccessControl(grantsObject);

const getPermissionAny = (method, role, source) => {
	if (method === 'GET') {
		return rbac.can(role).readAny(source);
	}
	if (method === 'POST') {
		return rbac.can(role).createAny(source);
	}
	if (method === 'PUT') {
		return rbac.can(role).updateAny(source);
	}
	if (method === 'DELETE') {
		return rbac.can(role).deleteAny(source);
	}
}

const getPermissionOwn = (method, role, source) => {
	if (method === 'GET') {
		return rbac.can(role).readOwn(source);
	}
	if (method === 'POST') {
		return rbac.can(role).createOwn(source);
	}
	if (method === 'PUT') {
		return rbac.can(role).updateOwn(source);
	}
	if (method === 'DELETE') {
		return rbac.can(role).deleteOwn(source);
	}
}

const getSource = (baseUrl) => {
	const split = baseUrl.split('/')
	const source = split.pop()
	return source
}

const permissions = (req, res, next) => {
	const user = req.user
	const role = user.role || 'anonymous'
	const method = req.method
	const source = getSource(req.baseUrl)

	const permission = (user.username === req.params.username) ?
		getPermissionOwn(method, role, source) :
		getPermissionAny(method, role, source)

	if (permission.granted) {
		next()
	} else {
		const path = url.parse(req.baseUrl).pathname
		// resource is forbidden for this user/role
		return res.status(429).send({
			message: `You're cannot access this source`,
			url: path,
			method: req.method
		})
	}
}

module.exports = permissions
