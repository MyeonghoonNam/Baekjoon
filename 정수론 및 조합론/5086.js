const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  if (line !== '0 0') {
    input.push(line.split(' ').map((el) => parseInt(el)));
  } else {
    rl.close();
  }
}).on('close', () => {
  let result = '';
  for (let numbers of input) {
    const firstNumber = numbers[0];
    const secondNumber = numbers[1];

    if (firstNumber % secondNumber === 0) {
      result += 'multiple\n';
    } else if (secondNumber % firstNumber === 0) {
      result += 'factor\n';
    } else {
      result += 'neither\n';
    }
  }

  console.log(result);
  process.exit();
});
