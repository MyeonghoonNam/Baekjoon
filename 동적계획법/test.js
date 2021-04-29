const input = ['3', '4', '7', '10'];

console.log(Solution(input).join('\n'));

function Solution(input) {
  const T = Number(input.shift());
  const result = [];

  for (let i = 0; i < T; i++) {
    const N = Number(input.shift());

    const dp = [0, 1, 2, 4];
    for (let j = 4; j <= N; j++) {
      dp[j] = dp[j - 1] + dp[j - 2] + dp[j - 3];
    }

    result.push(dp[N]);
  }

  return result;
}
