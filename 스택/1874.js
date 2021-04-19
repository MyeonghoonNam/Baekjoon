const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(parseInt(line));
}).on('close', () => {
  // 구현
  const N = input[0];
  input.shift();

  const stack = [];

  let startNum = 0;
  let result = '';

  for (let i = 0; i < N; i++) {
    const temp = input[i];

    if (temp > startNum) {
      for (let i = startNum + 1; i <= temp; i++) {
        stack.push(i);
        result += '+\n';
      }

      startNum = temp;
    } else if (stack[stack.length - 1] !== temp) {
      console.log('NO');
      return;
    }

    stack.pop();
    result += '-\n';
  }

  console.log(result);
  process.exit();
});
