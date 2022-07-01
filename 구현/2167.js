const inputArr = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((n) => +n));

const [N, M] = inputArr[0];

const nums = inputArr.slice(1, N + 1);

const [K] = inputArr[N + 1];

// 1차원 배열 누적합

// DP[i] => i까지의 누적합이라고 할 때,
// i부터 j까지의 누적합은 DP[i] - DP[j-1]로 표현할 수 있음.

const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

for (let i = 1; i <= N; i += 1) {
  for (let j = 1; j <= M; j += 1) {
    dp[i][j] =
      dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] + nums[i - 1][j - 1];
  }
}

// DP[i][j] => 1,1 부터 i,j 까지의 부분합

for (let start = 0; start < K; start += 1) {
  const [i, j, x, y] = inputArr[N + 2 + start];

  console.log(dp[x][y] - dp[i - 1][y] - dp[x][j - 1] + dp[i - 1][j - 1]);
}
