const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  if (line === '.') {
    rl.close();
  }
  input.push(line);
}).on('close', () => {
  // 구현
  for (str of input) {
    console.log(solve(str));
  }

  process.exit();

  function solve(str) {
    const stack = [];

    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (char === '(' || char === '[') {
        stack.push(char);
      } else if (char === ')') {
        if (stack.length === 0 || stack[stack.length - 1] !== '(') {
          return 'no';
        } else {
          stack.pop();
        }
      } else if (char === ']') {
        if (stack.length === 0 || stack[stack.length - 1] !== '[') {
          return 'no';
        } else {
          stack.pop();
        }
      }
    }

    if (stack.length === 0) {
      return 'yes';
    } else {
      return 'no';
    }
  }
});
