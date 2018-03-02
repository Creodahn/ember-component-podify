const colors = require('./lib/colors'),
      fs = require('graceful-fs'),
      path = require('path'),
      args = require('yargs-parser')(process.argv),
      readDir = require('./lib/read-dir');

console.log('starting...');

if(args.dir) {
  const componentDir = path.resolve(args.dir, 'app', 'components'),
      templateDir = path.resolve(componentDir, '..', 'templates', 'components');

  try {
    fs.lstatSync(componentDir);
    fs.lstatSync(templateDir);

    readDir(componentDir);
    readDir(templateDir);
  } catch(err) {
    console.error(
      colors.red,
      'Could not find either components or templates directory.',
      'Please confirm the provided directory is an Ember project.'
    );
  }
} else {
  console.error(colors.red, '\nYou must provide an argument like `--dir=<directory to podify components>`\n');
}
