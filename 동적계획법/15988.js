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
  const T = Number(input.shift());

  const MAX = 1000000;
  const MOD = 1000000009;

  const dp = [0];
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= MAX + 1; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % MOD;
  }

  for (let i = 0; i < T; i++) {
    console.log(dp[Number(input[i])]);
  }
});
