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
  Solution(input);

  function Solution(input) {
    const T = Number(input.shift());

    for (let t = 0; t < T; t++) {
      const N = Number(input.shift());
      const map = Array.from(new Array(3), () => new Array(N + 1).fill(0));
      const dp = Array.from(new Array(3), () => new Array(N + 1).fill(0));

      for (let i = 1; i < 3; i++) {
        const cost = input.shift().split(' ').map(Number);

        for (let j = 1; j <= N; j++) {
          map[i][j] = cost[j - 1];
        }
      }

      dp[1][1] = map[1][1];
      dp[2][1] = map[2][1];
      for (let i = 2; i <= N; i++) {
        dp[1][i] = Math.max(dp[2][i - 1], dp[2][i - 2]) + map[1][i];
        dp[2][i] = Math.max(dp[1][i - 1], dp[1][i - 2]) + map[2][i];
      }

      const result = Math.max(dp[1][N], dp[2][N]);
      console.log(result);
    }
  }
});
