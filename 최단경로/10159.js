const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
11
2 1
3 1
2 8
2 9
7 8
4 5
6 7
6 3
1 7
6 2
1 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const M = Number(input());
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

    const result = [];
    for (let i = 1; i <= N; i++) {
      let count = 0; // 비교 정보를 알 수 없는 경우의 수

      for (let j = 1; j <= N; j++) {
        if (i === j) continue;
        if (graph[i][j] === 0 && graph[j][i] === 0) count++;
      }

      result.push(count);
    }

    return result.join("\n");
  };

  const result = process();
  return result;
};

console.log(solution());
