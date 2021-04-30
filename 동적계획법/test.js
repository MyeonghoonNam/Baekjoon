// const input = ['1'];
const input = ['2'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input[0]);
  const MOD = 1000000000;

  const dp = Array.from(new Array(N + 1), () => new Array(10).fill(0));

  for (let i = 1; i <= 9; i++) {
    dp[1][i] = 1;
  }

  for (let i = 2; i <= N; i++) {
    // 마지막 자리수가 0인 경우
    dp[i][0] = dp[i - 1][1];

    for (let j = 1; j <= 9; j++) {
      // 마지막 자리수가 9인 경우
      if (j === 9) {
        dp[i][j] = dp[i - 1][8];
      } else {
        // 마지막 자리수가 1~8인 경우;
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j + 1];
      }

      dp[i][j] = dp[i][j] % MOD;
    }
  }

  const result = dp[N].reduce((acc, cur) => {
    return acc + cur;
  });

  return result;
}
