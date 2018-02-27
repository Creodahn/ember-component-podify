const colors = require('colors'),
      figures = require('figures'),
      fs = require('graceful-fs'),
      mkdirp = require('mkdirp'),
      path = require('path'),
      mv = require('mv'),
      args = require('minimist')(process.argv);

console.log('starting...');

if(args.dir) {
  const componentDir = path.resolve(args.dir, 'app', 'components'),
      componentTemplates = path.resolve(componentDir, '..', 'templates', 'components');

  fs.readdir(componentDir, function(err, list) {
    if(err) {
      console.log(colors.red('error reading component directory!\n'), err);
    } else if(list) {
      console.log('\nmoving component javascript...\n');

      list.map((item) => {
        let result = `${figures.tick} moved`;

        if(item.indexOf('.js') > -1) {
          mv(path.resolve(componentDir, item), path.resolve(componentDir, item.replace('.js', ''), 'component.js'), { mkdirp: true }, function(err) {
            if(err) {
              console.log(colors.red('error!'), err);
            }
          });
        } else {
          result = `${figures.cross} not moved`;
        }

        console.log(path.resolve(componentDir, item), result === 'moving...' ? colors.green(result) : colors.red(result));
      });
    } else {
      console.log('no results in component directory');
    }
  });

  fs.readdir(componentTemplates, function(err, list) {
    if(err) {
      console.log(colors.red('error reading component template directory!\n'), err);
    } else if(list) {
      console.log('\nmoving component templates...\n');

      list.map((item) => {
        let result = `${figures.tick} moved`;

        if(item.indexOf('.hbs') > -1) {
          mv(path.resolve(componentTemplates, item), path.resolve(componentDir, item.replace('.hbs', ''), 'template.hbs'), { mkdirp: true }, function(err) {
            if(err) {
              console.log(colors.red('template copy error!'), err);
            }
          });


        } else {
          result = `${figures.cross} not moved`;
        }

        console.log(path.resolve(componentTemplates, item), result === 'moving...' ? colors.green(result) : colors.red(result));
      });
    } else {
      console.log('no results in component template directory');
    }
  });
} else {
  console.error(colors.red('\nYou must provide an argument like `--dir=<directory to podify components>`\n'));
}
