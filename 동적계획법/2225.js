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
    const [N, K] = input[0].split(' ').map(Number);
    const MOD = 1000000000;

    const dp = Array.from(new Array(K + 1), () => new Array(N + 1).fill(0));

    for (let i = 0; i <= N; i++) {
      dp[1][i] = 1;
    }

    for (let k = 2; k <= K; k++) {
      for (let n = 0; n <= N; n++) {
        for (let l = 0; l <= n; l++) {
          dp[k][n] = dp[k][n] + dp[k - 1][n - l];
        }

        dp[k][n] = dp[k][n] % MOD;
      }
    }

    return dp[K][N];
  }
});
