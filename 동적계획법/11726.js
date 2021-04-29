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

    const dp = [0, 1, 2];
    for (let i = 3; i <= N; i++) {
      dp[i] = (dp[i - 2] + dp[i - 1]) % 10007;
    }

    return dp[N];
  }
});
