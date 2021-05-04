const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 구현
  const [E, S, M] = input[0].split(' ').map(Number);

  let year = 1;
  while (1) {
    if ((year - E) % 15 === 0 && (year - S) % 28 === 0 && (year - M) % 19 === 0)
      break;

    year++;
  }

  console.log(year);
});
