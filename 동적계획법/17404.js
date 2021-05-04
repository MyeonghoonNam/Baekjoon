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
    const cost = Array.from(new Array(N + 1), () => new Array(3).fill(0));

    for (let i = 0; i < N; i++) {
      cost[i + 1] = input.shift().split(' ').map(Number);
    }

    const dp = Array.from(new Array(N + 1), () => new Array());
    dp[0] = cost[0];

    let result = Number.MAX_SAFE_INTEGER;
    for (let k = 0; k <= 2; k++) {
      for (let i = 0; i <= 2; i++) {
        if (i === k) {
          dp[1][i] = cost[1][i];
        } else {
          dp[1][i] = Number.MAX_SAFE_INTEGER;
        }
      }

      for (let i = 2; i <= N; i++) {
        dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + cost[i][0];
        dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + cost[i][1];
        dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + cost[i][2];
      }

      for (let i = 0; i <= 2; i++) {
        if (i === k) continue;

        result = Math.min(result, dp[N][i]);
      }
    }

    return result;
  }
});
