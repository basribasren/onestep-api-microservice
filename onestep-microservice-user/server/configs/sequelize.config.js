const Sequelize = require('sequelize');
const log = require('../helpers/logger.helper.js')

const connection = () => {
	try {
		// Option 1: Passing parameters separately
		const sequelize = new Sequelize(process.env.SQL_DATABASE,
			process.env.SQL_USERNAME,
			process.env.SQL_PASSWORD, {
				host: process.env.SQL_HOST,
				dialect: process.env.SQL_DRIVER,
				/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
			});
		// Option 2: Passing a connection URI
		// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
		return sequelize
	} catch (err) {
		return log.failed('[SQL]', '#SQL201', `Error while trying create sequelize connection ${err.message}`)
	}
}


module.exports = connection;
