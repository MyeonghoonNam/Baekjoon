const input = ['3'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input);

  const dp = [0, 1, 1];
  for (let i = 3; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[N];
}
