var fs = require('graceful-fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    mv = require('mv');

//Change these paths to reflect the correct path for your project
var component_dir = path.resolve('..', 'municity-connect-ember', 'app', 'components'),
    component_templates = path.resolve(component_dir, '..', 'templates', 'components');

console.log(component_dir);

fs.readdir(component_dir, function(err, list) {
  for(var i = 0; i < list.length; i++) {
    if(list[i].indexOf('.js') > -1) {
      mv(path.resolve(component_dir, list[i]), path.resolve(component_dir, list[i].replace('.js', ''), 'component.js'), {mkdirp: true}, function(err) {
        if(err) {
          console.log('error!', err);
        }
      })
      console.log(list[i]);
    }
  }
});

fs.readdir(component_templates, function(err, list) {
  for(var i = 0; i < list.length; i++) {
    if(list[i].indexOf('.hbs') > -1) {
      mv(path.resolve(component_templates, list[i]), path.resolve(component_dir, list[i].replace('.hbs', ''), 'component.hbs'), {mkdirp: true}, function(err) {
        if(err) {
          console.log('template copy error!', err);
        }
      });
    }
  }
});
