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
const generateSwagger = () => {
	try {
		const swaggerSpec = swaggerJSDoc(swaggerOptions)
		return swaggerSpec
	} catch (err) {
		console.log('[Swagger] defining swagger failed!')
		return
	}
}

export default generateSwagger
