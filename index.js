#!/usr/bin/env node

/**
 * @muriukivincent/create-ts-app
 * Creates a typescript app
 *
 * @author Vincent Muriuki <powervel.com>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const simpleGit = require('simple-git')();
const url = require('url');
const fs = require('fs');
const chalk = require('chalk');
const { projectInstall } = require('pkg-install');
const process = require('process');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const gitUrl = 'https://github.com/vincentmuriuki/special-train.git';

const localURL = url.parse(gitUrl);
const localRepoName = (localURL.hostname + localURL.path)
	.replace('com', '')
	.replace('/', '')
	.replace('/', '.')
	.replace('.git', '');

const options = ['--depth', '1'];
const callback = () => {
	console.log(chalk.yellow('Initialized a new typescript project!'));
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	if (input.includes(`init`)) {
		if (input[1] && input[1].length > 0 && input[1] !== '.') {
			if (fs.existsSync(`./${input[1]}`)) {
				console.log(
					chalk.red('A local Git repository esists with that name!')
				);
			} else {
				await simpleGit
					.outputHandler((command, stdout, stderr) => {
						stdout.pipe(process.stdout);
						stderr.pipe(process.stderr);

						stdout.on('data', data => {
							// Print data
							console.log(
								chalk.magentaBright(data.toString('utf8'))
							);
						});
					})
					.clone(gitUrl, `./${input[1]}`, options, callback);

				// cd into the new dir and install dependencies
				console.log(chalk.gray('🔥 Installing dependencies...'));
				process.chdir(`${input[1]}`);
				const { stdout } = await projectInstall({
					cwd: process.cwd()
				});
				console.log(chalk.green(stdout));

				console.log(
					chalk.yellow(
						`✅ Finished installing dependencies! Next steps `
					)
				);
				console.log(
					chalk.gray(`\t\tcd ${input[1]}\n\t\tyarn watch`)
				);
				console.log(chalk.yellow('🚀 Happy hacking! 🫠'));
			}
		} else {
			console.log(chalk.red('Please provide a name for your project!'));
		}
	}

	debug && log(flags);
})();
