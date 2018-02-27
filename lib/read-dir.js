const colors = require('colors'),
      figures = require('figures'),
      fs = require('graceful-fs'),
      path = require('path');

module.exports = function readDir(directory) {
  const isTemplate = directory.indexOf('templates') > -1,
        extension = isTemplate ? '.hbs' : '.js',
        fileName = isTemplate ? 'template' : 'component';

  fs.readdir(directory, function(err, list) {
    if(err) {
      console.log(colors.red('error reading component directory!\n'), err);
    } else if(list) {
      console.log(`\nmoving ${extension.replace('.', '')}...\n`);

      list.map((item) => {
        const newName = `${fileName}${extension}`,
              newPath = path.resolve(directory.replace(`templates${path.sep}`, ''), item.replace(extension, '')),
              oldPath = path.resolve(directory, item),
              destination = path.resolve(newPath, newName);
        let result = `${figures.tick} moved`;

        if(item.indexOf(extension) > -1) {
          try {
            fs.lstatSync(newPath);
          } catch(err) {
            createNewPath(newPath);
          }

          fs.rename(oldPath, destination, function(err) {
            if(err) {
              console.log(colors.red('error!'), err);
            }
          });
        } else {
          result = `${figures.cross} not moved`;
        }

        console.log(path.resolve(directory, item), result.indexOf('not') > -1 ? colors.red(result) : colors.green(result));
      });
    } else {
      console.log(`no results in ${directory}`);
    }
  });
}

function createNewPath(newPath) {
  const pathParts = newPath.split(path.sep);
  let builtPath = '';

  pathParts.map((part) => {
    builtPath += part === '' ? '' : `/${part}`;

    if(builtPath !== '') {
      try {
        fs.lstatSync(builtPath);
      } catch(err) {
        // means no dir, so make it
        fs.mkdirSync(builtPath);
      }
    }
  });
}
