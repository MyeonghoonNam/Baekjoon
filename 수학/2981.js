const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(parseInt(line));
}).on('close', () => {
  const N = input[0];
  const numbers = input.slice(1);

  numbers.sort((a, b) => a - b);

  let gcdValue = numbers[1] - numbers[0];
  for (let i = 2; i < N; i++) {
    gcdValue = GCD(gcdValue, numbers[i] - numbers[i - 1]);
  }

  let result = '';
  for (let i = 2; i <= gcdValue; i++) {
    if (gcdValue % i === 0) {
      result += `${i} `;
    }
  }

  console.log(result);
  process.exit();

  function GCD(number1, number2) {
    if (number2 === 0) {
      return number1;
    } else {
      return GCD(number2, number1 % number2);
    }
  }
});
