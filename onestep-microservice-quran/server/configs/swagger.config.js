const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const log = require('../helpers/logger.helper.js')

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: process.env.APP_NAME,
		version: process.env.APP_VERSION,
		description: process.env.APP_DESCRIPTION
	},
	basePath: '/',
	components: {
		securitySchemes: {
			ApiKeyAuth: {
				type: 'apiKey',
				in: 'query',
				name: 'token',
			}
		},
	}
}

const swaggerOptions = {
	swaggerDefinition: swaggerDefinition,
	apis: [
		path.join(__dirname, '../api-docs/swagger-config/*.js'),
		path.join(__dirname, '../api-docs/swagger-config/*.yml'),
	],
}

const swagger = () => {
	try {
		const swaggerSpec = swaggerJSDoc(swaggerOptions)
		log.success('[SWAGGER]', 'success creating swagger definition')
		return swaggerSpec
	} catch (err) {
		return log.failed('[SWAGGER]', '#EX204', `Error while creating swagger definition`)
	}
}

module.exports = swagger
