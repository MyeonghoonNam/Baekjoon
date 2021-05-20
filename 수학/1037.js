const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  const N = input[0][0];
  const factors = input[1];

  factors.sort((a, b) => a - b);

  console.log(factors[0] * factors[N - 1]);

  process.exit();
});
