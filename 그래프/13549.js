const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  // 입력 관리
}).on('close', () => {
  // 구현
  process.exit();
});
