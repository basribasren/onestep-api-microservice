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
				console.log('[SQL] Connection has been established successfully.')
			})
			.catch((err) => {
				console.log(`[SQL] ${err.name}: Unable to connect to the database`)
			});
	} catch (err) {
		return console.log(`[SQL] ${err.name}: Unable to connect to the database`)
	}
}

const synchronized = (mysql) => {
	try {
		// Synchronizing any model changes with database.
		return mysql
			.sync()
			.then(() => {
				console.log('[SQL] Database synchronized')
			})
			.catch((err) => {
				console.log(`[SQL] ${err.name}: Database synchronized failed!`)
			});
	} catch (err) {
		return console.log(`[SQL] ${err.name}: Database synchronized failed!`)

	}
}

module.exports = { authenticate, synchronized }
