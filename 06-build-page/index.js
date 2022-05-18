const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');


const assetsPath = path.join(__dirname, 'assets');
const distAssetsPath = path.join(__dirname, 'project-dist', 'assets');

fs.promises.mkdir(distPath, { recursive: true });
fs.promises.mkdir(distAssetsPath, { recursive: true });


const stylesPath = path.join(__dirname, 'styles');
const distStylePath = path.join(__dirname, 'project-dist', 'style.css');
const distStyleStream = fs.createWriteStream(distStylePath);


fs.readdir(assetsPath, { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  for (let i = 0; i < files.length; i++) {
    const foldPath = path.join(__dirname, 'assets', files[i].name);
    const createDirFolderPath = path.join(__dirname, 'project-dist', 'assets', files[i].name);
    fs.promises.mkdir(createDirFolderPath, { recursive: true });
    fs.readdir(foldPath, { withFileTypes: true }, (err, file) => {
      if (err) {
        console.log(err);
      } else {
        for (let j = 0; j < file.length; j++) {
          const filePath = path.join(foldPath, file[j].name);
          const copyDirFolderPath = path.join(createDirFolderPath, file[j].name);
          fs.promises.copyFile(filePath, copyDirFolderPath);
        }
      }
    });
  }
});

fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    for (let i = 0; i < files.length; i++) {
      const stylesFilePath = path.join(stylesPath, files[i].name);
      const readStream = fs.createReadStream(stylesFilePath);
      readStream.on('data', (text) => {
        distStyleStream.write(text);
      });
    }
  }
});


const distIndexPath = path.join(__dirname, 'project-dist', 'index.html');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

const templateRead = fs.createReadStream(templatePath, 'utf-8');
const indexWriteStream = fs.createWriteStream(distIndexPath);

templateRead.on('data', text => {
  fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file, index) => {
        if (file.isDirectory() === false && file.name.slice(file.name.length - 5, file.name.length) === '.html') {
          const componentsFile = path.join(componentsPath, file.name);
          const readComponents = fs.createReadStream(componentsFile, 'utf-8');
          let dotIndex = file.name.indexOf('.');
          const nameComponents = file.name.slice(0, dotIndex);
          const target = `{{${nameComponents}}}`;
          readComponents.on('data', data => {
            text = text.replace(target, data);
            if (index === files.length - 1) {
              indexWriteStream.write(text);
            }
          });
        }
      });
    }
  });
});