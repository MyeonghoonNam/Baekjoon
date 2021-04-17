const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  const T = input[0][0];
  const siteCount = input.splice(1);

  for (let i = 0; i < T; i++) {
    const N = siteCount[i][0];
    const M = siteCount[i][1];

    const dp = Array.from(new Array(M + 1), () => new Array(N + 1).fill(0));

    for (let i = 0; i <= M; i++) {
      dp[i][i] = 1;
      dp[i][0] = 1;
    }

    for (let i = 2; i <= M; i++) {
      for (let j = 1; j <= N; j++) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      }
    }

    console.log(dp[M][N]);
  }

  process.exit();
});
