const input = ['7'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input[0]);

  const dp = [0];

  for (let i = 1; i <= N; i++) {
    dp[i] = i;

    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[N];
}
