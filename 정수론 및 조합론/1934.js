// 유클리드 호제법을 활용한 최대공약수와 최소공배수 구하기

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
  const numbers = input.slice(1);

  let result = '';
  for (let i = 0; i < N; i++) {
    result +=
      LCM(numbers[i][0] * numbers[i][1], GCD(numbers[i][0], numbers[i][1])) +
      '\n';
  }

  console.log(result);
  process.exit();

  // 최대 공약수
  function GCD(number1, number2) {
    if (number2 === 0) {
      return number1;
    } else {
      return GCD(number2, number1 % number2);
    }
  }

  // 최소 공배수
  function LCM(numbersMultiple, GCD) {
    return numbersMultiple / GCD;
  }
});
