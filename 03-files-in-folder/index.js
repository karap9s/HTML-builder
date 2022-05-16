const fs = require('fs');
const path = require('path');

const newPath = path.join(__dirname, 'secret-folder');

fs.readdir(newPath, { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    for (let i = 0; i < files.length; i++) {
      const veryNewPath = path.join(__dirname, 'secret-folder', files[i].name);
      if (files[i].isDirectory() === false) {
        fs.stat(veryNewPath, (err, stats) => {
          if (err)
            console.log(err);
          else {
            let index = files[i].name.indexOf('.');
            console.log(files[i].name.slice(0, index) + ' - ' + files[i].name.slice(index + 1, files[i].name.length) + ' - ' + (stats.size / 1024).toFixed(3) + 'kb');
          }
        });
      }
    }
  }
});