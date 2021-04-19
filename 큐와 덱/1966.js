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
  const T = input[0][0];
  const N = [];
  const M = [];
  const priorty = [];
  for (let i = 1; i < T * 2; i += 2) {
    N.push(input[i][0]);
    M.push(input[i][1]);
  }

  for (let i = 2; i <= T * 2; i += 2) {
    priorty.push(input[i]);
  }

  for (let i = 0; i < T; i++) {}

  process.exit();
});
