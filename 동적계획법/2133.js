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
    const N = Number(input[0]);

    const dp = new Array(N + 1).fill(0);
    dp[0] = 1;
    dp[1] = 0;
    dp[2] = 3;

    for (let i = 4; i <= N; i++) {
      dp[i] = dp[i - 2] * dp[2];
      for (let j = i - 4; j >= 0; j = j - 2) {
        dp[i] = dp[i] + dp[j] * 2;
      }
    }

    return dp[N];
  }
});
