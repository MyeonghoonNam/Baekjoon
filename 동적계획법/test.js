const input = ['3', '4', '7', '10'];

console.log(Solution(input));

function Solution(input) {
  const T = Number(input[0]);

  const MAX = 1000000;
  const MOD = 1000000009;

  const dp = new Array(MAX).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  const result = [];
  for (let i = 1; i < T + 1; i++) {
    const N = Number(input[i]);

    for (let j = 4; j <= N; j++) {
      dp[j] = (dp[j - 1] + dp[j - 2] + dp[j - 3]) % MOD;
    }

    result.push(dp[N]);
  }

  const print = result.join('\n');

  return print;
}
