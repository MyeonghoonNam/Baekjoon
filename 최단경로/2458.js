const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 3
1 2
2 3
4 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

  for (let i = 0; i < M; i++) {
    const [vertex1, vertex2] = input().split(" ").map(Number);
    graph[vertex1][vertex2] = 1;
  }

  const floyd = () => {
    for (let k = 1; k <= N; k++) {
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          if (graph[i][k] && graph[k][j]) {
            graph[i][j] = 1;
          }
        }
      }
    }
  };

  const process = () => {
    floyd();

    let result = 0;
    for (let i = 1; i <= N; i++) {
      let count = 0;
      for (let j = 1; j <= N; j++) {
        if (graph[i][j] || graph[j][i]) count++;
      }

      if (count === N - 1) result++;
    }

    return result;
  };

  return process();
};

console.log(solution());
