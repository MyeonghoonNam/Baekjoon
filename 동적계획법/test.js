// const input = ['2'];
const input = ['10'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input[0]);

  const dp = [0, 0];
  for (let i = 2; i <= N; i++) {
    dp[i] = dp[i - 1] + 1;

    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    }

    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    }
  }

  return dp[N];
}
