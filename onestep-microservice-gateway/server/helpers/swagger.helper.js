const fetch = require('node-fetch');
const _ = require("lodash")

/**
 * This is how to take object from array and merge it
 * const arrObj = [{a: 1, b: 2}, {c: 3, d: 4}, {e: 5, f: 6}];
 * 
 * console.log(arrObj.reduce(function(result, current) {
 * 	return Object.assign(result, current)
 * }, {}));
 * 
 * If you prefer arrow functions, you can make it a one-liner ;-
 * console.log(arrObj.reduce(((r, c) => Object.assign(r, c)), {}));
 * 
 * Thanks Spen from the comments. You can use the spread operator with assig
 * console.log(Object.assign({}, ...arrObj)); 
 */

const getConfiguration = (path) => {
	return fetch(path)
		.then(res => {
			return res.json()
		})
		.catch(err => {
			console.log('Error while trying fetch the swagger')
			return
		})
}

const mergeConfiguration = (defaults, services) => {
	try {
		return services.reduce(function (result, current) {
			return Object.assign(result, current);
		}, {})
	} catch (err) {
		console.log('Error while trying merge the swagger')
		return defaults
	}
}

const getAndMerge = async (swaggerDefault) => {
	/* get the child service swagger definition */
	const userDefinition = await getConfiguration(`${process.env.USER_PATH}/v1/user-docs.json`);
	/* merge all swagger definition */
	const swaggerFinal = mergeConfiguration(swaggerDefault, [swaggerDefault, userDefinition]);
	return swaggerFinal
}

module.exports = {
	getConfiguration,
	mergeConfiguration,
	getAndMerge
}
