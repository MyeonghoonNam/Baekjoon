const input = ['2'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());

  const dp = new Array(N + 1).fill(0);
  dp[0] = 1;
  dp[1] = 0;
  dp[2] = 3;

  for (let i = 4; i <= N; i++) {
    dp[i] = d[i - 2] * dp[2];
    for (let j = i - 4; j >= 0; j = j - 2) {
      dp[i] = dp[i] + dp[j] * 2;
    }
  }

  return dp[N];
}
