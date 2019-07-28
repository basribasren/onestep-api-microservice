import chalk from 'chalk'
const isProduction = process.env.NODE_ENV === 'production';

const success = (type, message) => {
	if (!isProduction) {
		return console.log(chalk.white.bgGreen(type) + ' ' + chalk.green(message))
	}
}
const warning = (type, code, message) => {
	if (!isProduction) {
		return console.log(chalk.white.bgYellow(type) + ' ' + chalk.yellow(code) + ': ' + chalk.yellow(message))
	}
}
const failed = (type, code, message) => {
	if (!isProduction) {
		return console.log(chalk.white.bgRed(type) + ' ' + chalk.red(code) + ': ' + chalk.red(message))
	}
}

export default {
	success,
	warning,
	failed
}
