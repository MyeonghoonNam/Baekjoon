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
    const arr = input.shift().split(' ').map(Number);

    const dp = [];
    for (let i = 0; i < N; i++) {
      dp[i] = 1;

      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
        }
      }
    }

    const result = Math.max(...dp);

    return result;
  }
});
