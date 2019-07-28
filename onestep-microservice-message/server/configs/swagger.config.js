import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

/**
 * Swagger definition.
 */
const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: process.env.APP_NAME,
		version: process.env.APP_VERSION,
		description: process.env.APP_DESCRIPTION,
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


/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: [
		path.join(__dirname, '../api-docs/swagger-config/*.js'),
		path.join(__dirname, '../api-docs/swagger-config/*.yml'),
	],
}

/**
 * Initialize swagger-jsdoc.
 */
const generateSwagger = (log) => {
	try {
		const swaggerSpec = swaggerJSDoc(swaggerOptions)
		log.success('[SWAGGER]', 'success creating swagger definition')
		return swaggerSpec
	} catch (err) {
		return log.failed('[SWAGGER]', '#EX204', `Error while creating swagger definition`)
	}
}

export default { generateSwagger }
