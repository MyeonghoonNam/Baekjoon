const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  // 구현
  const N = input[0][0];
  const numbers = input[1];
  const stack = [];
  let top = stack.length - 1;

  for (let i = 0; i < N; i++) {
    NGE(i);
  }

  for (let i = top; i >= 0; i--) {
    numbers[stack.pop()] = -1;
  }

  console.log(numbers.join(' '));

  function NGE(idx) {
    while (top !== -1 && numbers[stack[top]] < numbers[idx]) {
      numbers[stack.pop()] = numbers[idx];
      top--;
    }

    stack.push(idx);
    top++;
  }
});
