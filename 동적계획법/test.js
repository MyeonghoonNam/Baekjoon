const input = ['3', '26 40 83', '49 60 57', '13 89 99'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());

  const cost = Array.from(new Array(N + 1), () => new Array(3).fill(0));

  for (let i = 1; i <= N; i++) {
    cost[i] = input.shift().split(' ').map(Number);
  }

  const dp = Array.from(new Array(N + 1), () => new Array(3).fill(0));

  dp[0] = cost[0];
  for (let i = 1; i <= N; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + cost[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + cost[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + cost[i][2];
  }

  return Math.min(...dp[N]);
}
