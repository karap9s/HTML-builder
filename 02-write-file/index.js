const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');

const newPath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(newPath);

stdout.write('Enter your text (To close use Ctrl + C combination or word exit)...\n> ');
stdin.on('data', data => {
  if (data.toString().slice(0, 4) === 'exit') {
    process.exit();
  } else {
    stdout.write ('> ');
    writeStream.write(data);
  }
});

process.on('exit', () => {
  stdout.write ('Bye-bye!');
});
process.on('SIGINT', () => {
  process.exit();
});