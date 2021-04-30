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
  console.log(Solution(input));

  function Solution(input) {
    const N = Number(input.shift());
    const arr = input.shift().split(' ').map(Number);

    const dp = [arr[0]];
    for (let i = 1; i < N; i++) {
      dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
    }

    const result = Math.max(...dp);

    return result;
  }
});
