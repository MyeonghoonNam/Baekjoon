const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  let number = parseInt(line);
  let count = 0;

  while (number >= 5) {
    count += parseInt(number / 5);
    number = parseInt(number / 5);
  }

  console.log(count);
}).on('close', () => {
  process.exit();
});
