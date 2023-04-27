const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
NYNNN
YNYNN
NYNYN
NNYNY
NNNYN`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const graph = Array.from(new Array(N), () => new Array(N).fill(Infinity));

  for (let i = 0; i < N; i++) {
    const row = input().split("");

    for (let j = 0; j < N; j++) {
      if (row[j] === "Y") {
        graph[i][j] = 1;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  let result = 0;

  for (let i = 0; i < N; i++) {
    let count = 0;

    for (let j = 0; j < N; j++) {
      if (graph[i][j] !== Infinity && graph[i][j] <= 2 && graph[i][j] > 0) {
        count += 1;
      }
    }

    result = Math.max(result, count);
  }

  return result;
};

console.log(solution());
