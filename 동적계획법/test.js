const input = ['4'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input[0]);
  const MOD = 9901;

  const dp = Array.from(new Array(N + 1), () => new Array(3).fill(0));

  dp[1][0] = 1;
  dp[1][1] = 1;
  dp[1][2] = 1;

  for (let i = 2; i <= N; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % MOD;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD;
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % MOD;
  }

  const result = dp[N].reduce((arr, cur) => {
    return arr + cur;
  });

  return result % MOD;
}
