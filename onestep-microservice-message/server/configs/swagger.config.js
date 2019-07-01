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
		/**
		 * termsOfService: 'http://swagger.io/terms/',
		 * contact: {
		 * 	email: 'basri.basreen@gmail.com',
		 * },
		 * license: {
		 * 	name: 'Apache 2.0',
		 * 	url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
		 * },
		 **/
	},
	basePath: '/',
	/**
	 * uncomment this if you want to add scurity schema on endpoint
	 * components: {
	 * 	securitySchemes: {
	 * 		BasicAuth: {
	 * 			type: 'http',
	 * 			scheme: 'basic',
	 * 		},
	 * 		bearerAuth: {
	 * 			type: 'http',
	 * 			scheme: 'bearer',
	 *		},
	 * 		ApiKeyAuth: {
	 *			type: 'apiKey',
	 * 			in: 'cookie',
	 * 			name: 'token',
	 *		}
	 * 	},
	 * }
	 **/
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
		return
	}
}

export default generateSwagger
