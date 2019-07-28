const log = require('./logger.helper.js')

/**
 *  ******************************************************************
 *  cek for mysql connection and sync database
 *  ******************************************************************
 */
const authenticate = (mysql) => {
	try {
		return mysql
			.authenticate()
			.then(() => {
				log.success('[SQL]', 'success connecting to database')
			})
			.catch((err) => {
				log.failed('[SQL]', '#SQL202', `${err.name} Unable to connect to the database`)
			});
	} catch (err) {
		return log.failed('[SQL]', '#SQL202', `${err.name} Unable to connect to the database`)
	}
}

const synchronized = (mysql) => {
	try {
		// Synchronizing any model changes with database.
		return mysql
			.sync()
			.then(() => {
				log.success('[SQL]', 'success synchronizing database')
			})
			.catch((err) => {
				log.failed('[SQL]', '#SQL203', `${err.name} Database synchronized failed!`)
			});
	} catch (err) {
		return log.failed('[SQL]', '#SQL203', `${err.name} Database synchronized failed!`)
	}
}

module.exports = { authenticate, synchronized }
