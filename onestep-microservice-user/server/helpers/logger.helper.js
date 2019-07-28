const chalk = require('chalk');
const isProduction = process.env.NODE_ENV === 'production';

const log = {
	success: (type, message) => {
		if (!isProduction) {
			return console.log(chalk.white.bgGreen(type) + ' ' + chalk.green(message))
		}
	},
	warning: (type, code, message) => {
		if (!isProduction) {
			return console.log(chalk.white.bgYellow(type) + ' ' + chalk.yellow(code) + ': ' + chalk.yellow(message))
		}
	},
	failed: (type, code, message) => {
		if (!isProduction) {
			return console.log(chalk.white.bgRed(type) + ' ' + chalk.red(code) + ': ' + chalk.red(message))
		}
	}
}

module.exports = log
