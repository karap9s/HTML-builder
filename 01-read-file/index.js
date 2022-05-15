const fs = require('fs');
const path = require('path');

const newPath = path.join(__dirname, 'text.txt');

const read = fs.createReadStream(newPath, 'utf8');

read.on('data', (text) => {
  console.log(text);
});