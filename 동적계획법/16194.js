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
    const cards = input.shift().split(' ').map(Number);
    cards.unshift(0);

    const dp = [0, cards[1]];
    for (let i = 2; i <= N; i++) {
      dp[i] = Number.MAX_SAFE_INTEGER;

      for (let j = 1; j <= i; j++) {
        dp[i] = Math.min(dp[i], dp[i - j] + cards[j]);
      }
    }

    return dp[N];
  }
});
