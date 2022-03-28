const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');
const chalk = require('chalk');
const figlet = require('figlet');

module.exports = ({ clear = true }) => {
	unhandled();
	welcome({
		title: chalk.yellow(
			figlet.textSync(`create-typescript-app`, {
				// horizontalLayout: 'full'
			})
		),
		tagLine: `by Vincent Muriuki`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
};
