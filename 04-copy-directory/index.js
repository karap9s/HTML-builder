const fs = require('fs');
const path = require('path');

const copyPath = path.join(__dirname, 'files');
const newPath = path.join(__dirname, 'files-copy');

fs.promises.mkdir(newPath, { recursive: true });

fs.readdir(newPath, (err, files) => {
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(newPath, files[i]);
    fs.unlink(filePath, err => {
      if (err) {
        console.log(err);
      }
    });
  }
});

fs.readdir(copyPath, (err, files) => {
  if (err)
    console.log(err);
  for (let i = 0; i < files.length; i++) {
    let newCopyPath = path.join(__dirname, 'files', files[i]);
    let veryNewPath = path.join(__dirname, 'files-copy', files[i]);
    fs.promises.copyFile(newCopyPath, veryNewPath);
  }
});