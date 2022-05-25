const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 3
1 2 3 4
2 3 4 5
3 4 5 6
4 5 6 7
2 2 3 4
3 4 3 4
1 1 4 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const board = new Array(N);
  const DP = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));
  const result = [];

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    board[i] = row;

    for (let j = 0; j < N; j++) {
      // DP[x][y] = (1, 1)부터 (x, y)까지의 누적합
      DP[i + 1][j + 1] = DP[i][j + 1] + DP[i + 1][j] - DP[i][j] + board[i][j];
    }
  }

  for (let i = 0; i < M; i++) {
    const [x1, y1, x2, y2] = input().split(" ").map(Number);
    const prefix_sum =
      DP[x2][y2] - DP[x2][y1 - 1] - DP[x1 - 1][y2] + DP[x1 - 1][y1 - 1];

    result.push(prefix_sum);
  }

  return result.join("\n");
};

console.log(solution());
