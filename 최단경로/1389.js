const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 5
1 3
1 4
4 5
4 3
3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(Infinity)
  );

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);

    graph[start][end] = 1;
    graph[end][start] = 1;
  }

  const floyd = () => {
    for (let k = 1; k <= N; k++) {
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
        }
      }
    }
  };

  const process = () => {
    floyd();

    let min_value = Number.MAX_SAFE_INTEGER;
    const total_value = [];

    for (let i = 1; i <= N; i++) {
      let temp = 0;

      for (let j = 1; j <= N; j++) {
        temp += graph[i][j];
      }

      total_value.push(temp);
      min_value = Math.min(min_value, temp);
    }

    const result = total_value.indexOf(min_value) + 1;
    return result;
  };

  const result = process();
  return result;
};

console.log(solution());
