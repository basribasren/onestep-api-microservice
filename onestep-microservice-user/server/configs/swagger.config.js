const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: process.env.APP_NAME,
		version: process.env.APP_VERSION,
		description: process.env.APP_DESCRIPTION
	},
	basePath: '/'
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
		return swaggerSpec
	} catch (err) {
		return console.log('[SWAGGER] Error: ' + err.message)
	}
}

module.exports = swagger
