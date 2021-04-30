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

    const arr = new Array(N + 1).fill(0);
    for (let i = 1; i <= N; i++) {
      arr[i] = input.shift().split(' ').map(Number);
    }

    const dp = Array.from(new Array(N + 1), () => new Array());
    dp[1][0] = arr[1][0];

    for (let i = 2; i <= N; i++) {
      for (let j = 0; j < i; j++) {
        // 층의 첫 번째 수
        if (j === 0) {
          dp[i][j] = dp[i - 1][j] + arr[i][j];
        } else if (j === i - 1) {
          // 층의 마지막 번째 수
          dp[i][j] = dp[i - 1][j - 1] + arr[i][j];
        } else {
          // 처음과 마지막 사이의 수
          dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + arr[i][j];
        }
      }
    }

    const result = Math.max(...dp[N]);

    return result;
  }
});
