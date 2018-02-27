
const path = require('path'),
      args = require('yargs-parser')(process.argv),
      readDir = require('./lib/read-dir');

console.log('starting...');

if(args.dir) {
  const componentDir = path.resolve(args.dir, 'app', 'components'),
      componentTemplates = path.resolve(componentDir, '..', 'templates', 'components');

  readDir(componentDir);
  readDir(componentTemplates);
} else {
  console.error(colors.red('\nYou must provide an argument like `--dir=<directory to podify components>`\n'));
}
