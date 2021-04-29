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
    const T = Number(input.shift());
    const result = [];

    for (let i = 0; i < T; i++) {
      const N = Number(input.shift());

      const dp = [0, 1, 2, 4];
      for (let j = 4; j <= N; j++) {
        dp[j] = dp[j - 1] + dp[j - 2] + dp[j - 3];
      }

      result.push(dp[N]);
    }

    return result.join('\n');
  }
});
