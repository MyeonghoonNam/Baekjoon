const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  for (let i = 0; i < input.length; i++) {
    const str = input[i].split('');

    let lowerCount = 0;
    let upperCount = 0;
    let numberCount = 0;
    let spaceCount = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (char.match(/^[a-z]/g)) {
        lowerCount++;
      } else if (char.match(/^[A-Z]/g)) {
        upperCount++;
      } else if (char.match(/^[0-9]/g)) {
        numberCount++;
      } else if (char.match(/^[ ]/g)) {
        spaceCount++;
      }
    }

    console.log(`${lowerCount} ${upperCount} ${numberCount} ${spaceCount}`);
  }
});
