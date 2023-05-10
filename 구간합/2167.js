const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2 3
1 2 4
8 16 32
3
1 1 2 3
1 2 1 2
1 3 2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const numbers = Array.from(new Array(N + 1), () => new Array(M + 1).fill(0));
  const prefix = Array.from(new Array(N + 1), () => new Array(M + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    const row = input().split(" ").map(Number);

    for (let j = 1; j <= M; j++) {
      numbers[i][j] = row[j - 1];
    }
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      prefix[i][j] =
        numbers[i][j] +
        prefix[i - 1][j] +
        prefix[i][j - 1] -
        prefix[i - 1][j - 1];
    }
  }

  const K = Number(input());
  const queries = [];

  for (let i = 0; i < K; i++) {
    queries.push(input().split(" ").map(Number));
  }

  const result = [];

  for (let i = 0; i < K; i++) {
    const [sx, sy, ex, ey] = queries[i];
    const sum =
      prefix[ex][ey] -
      prefix[sx - 1][ey] -
      prefix[ex][sy - 1] +
      prefix[sx - 1][sy - 1];

    result.push(sum);
  }

  return result.join("\n");
};

console.log(solution());
