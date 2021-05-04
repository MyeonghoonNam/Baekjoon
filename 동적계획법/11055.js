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
    const numbers = input.shift().split(' ').map(Number);

    const dp = [];
    let max = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < N; i++) {
      dp[i] = numbers[i];

      for (let j = 0; j < i; j++) {
        if (numbers[i] > numbers[j] && dp[i] < dp[j] + numbers[i]) {
          dp[i] = dp[j] + numbers[i];
        }
      }

      max = max < dp[i] ? dp[i] : max;
    }

    return max;
  }
});
