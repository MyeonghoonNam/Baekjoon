// const input = ['1'];
// const input = ['2'];
const input = ['3'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input[0]);
  const MOD = 10007;

  const dp = Array.from(new Array(N + 1), () => new Array(10).fill(0));

  for (let i = 0; i < 10; i++) {
    dp[1][i] = 1;
  }

  for (let i = 2; i <= N; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k <= j; k++) {
        dp[i][j] = (dp[i][j] + dp[i - 1][k]) % MOD;
      }
    }
  }

  const result = dp[N].reduce((acc, cur) => {
    return acc + cur;
  });

  return result % MOD;
}
