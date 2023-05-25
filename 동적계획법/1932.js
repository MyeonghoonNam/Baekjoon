const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const DP = Array.from(new Array(N + 1), () => new Array());
  const triangle = [[]];

  for (let i = 0; i < N; i++) {
    triangle.push(input().split(" ").map(Number));
  }

  DP[1][0] = triangle[1][0];

  for (let i = 2; i <= N; i++) {
    for (let j = 0; j < i; j++) {
      if (j === 0) {
        DP[i][j] = DP[i - 1][j] + triangle[i][j];
      } else if (j === i - 1) {
        DP[i][j] = DP[i - 1][j - 1] + triangle[i][j];
      } else {
        DP[i][j] = Math.max(DP[i - 1][j - 1], DP[i - 1][j]) + triangle[i][j];
      }
    }
  }

  const result = Math.max(...DP[N]);

  return result;
};

console.log(solution());
