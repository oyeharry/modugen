#!/usr/bin/env node

const meow = require('meow');
const modugen = require('.');

const cli = meow(
  `
	Usage
	  $ modugen <path-to-template>.<module-name>
	Options
		--cwd current working directory
		--templateFilesDir templates directory to look for. Default is ./templates
		--destPath destination directory for output.
  Examples
  Look for template file name starting with 'CoreModule' inside 'templates/' and generate BaseButton module.
  $ modugen CoreModule.BaseButton

  Look for template file name starting with 'CoreModule' inside 'templates/src/' and generate BaseButton module.
  $ modugen src.CoreModule.BaseButton

  Look for template file name starting with 'PageModule' inside 'templates/src/pages' and generate HomePage module at 'src/pages/'.
  $ modugen src.pages.PageModule.HomePage
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
