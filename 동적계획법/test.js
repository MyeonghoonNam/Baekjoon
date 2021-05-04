const input = ['10', '10 -4 3 1 5 6 -35 12 21 -1'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());
  const arr = input.shift().split(' ').map(Number);

  const dp = Array.from(new Array(N), () => new Array());
  dp[0][0] = dp[0][1] = arr[0];

  let result = arr[0];

  for (let i = 1; i < N; i++) {
    dp[i][0] = Math.max(dp[i - 1][0] + arr[i], arr[i]);
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][1] + arr[i]);

    result = Math.max(result, Math.max(dp[i][0], dp[i][1]));
  }

  return result;
}
