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

    const dp = [0, 0];
    for (let i = 2; i <= N; i++) {
      dp[i] = dp[i - 1] + 1;

      if (i % 2 === 0) {
        dp[i] = Math.min(dp[i], dp[i / 2] + 1);
      }

      if (i % 3 === 0) {
        dp[i] = Math.min(dp[i], dp[i / 3] + 1);
      }
    }

    return dp[N];
  }
});
