#!/usr/bin/env node

const meow = require('meow');
const modugen = require('.');

const cli = meow(
  `
	Usage
	  $ modugen <command>
	Options
		--cwd current working directory
		--templateFilesDir templates directory to look for. Default is ./templates
		--destPath destination directory for output.
	Examples
		Create a module.
		$ modugen BaseButton
`,
  {
    flags: {
      cwd: {
        default: process.cwd(),
        type: 'string',
      },
      templateFilesDir: {
        default: './templates',
        type: 'string',
      },
      destPath: {
        default: '',
        type: 'string',
      },
    },
  }
);

const log = console.log.bind(console); //eslint-disable-line

const command = cli.input[0];
if (!cli.input.length || !command) {
  log('No command. $ modugen --help');
  return;
}

const opts = cli.flags;

log('Writing', cli.input[0]);

if (!command) {
  log('Please define module template command. $ modugen --help');
  return;
}

modugen(command, opts);
