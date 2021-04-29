// const input = ['2'];
const input = ['9'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input[0]);

  const dp = [0, 1, 2];
  for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 2] + dp[i - 1]) % 10007;
  }

  return dp[N];
}
