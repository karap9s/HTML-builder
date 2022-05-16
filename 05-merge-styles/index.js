const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const readPath = path.join(__dirname, 'styles');
let distWriteStream = fs.createWriteStream(bundlePath);

fs.readdir(readPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    for (let i = 0; i < files.length; i++) {
      const index = files[i].indexOf('.');
      if (files[i].slice(index + 1, files[i].length) === 'css') {
        const newReadPath = path.join(__dirname, 'styles', files[i]);
        const readStream = fs.createReadStream(newReadPath);
        readStream.on('data', (text) => {
          distWriteStream.write(text);
        });
      }
    }
  }
});