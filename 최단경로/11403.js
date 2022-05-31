const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
0 0 0 1 0 0 0
0 0 0 0 0 0 1
0 0 0 0 0 0 0
0 0 0 0 1 1 0
1 0 0 0 0 0 0
0 0 0 0 0 0 1
0 0 1 0 0 0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항: 가중치 없는 방향 그래프에서 모든 정점 (i, j)에 대해 i에서 j로 가는 경로가 있는지 여부를 도출
 */
const solution = () => {
  const N = Number(input());
  const graph = Array.from(new Array(N), () => []);

  for (let i = 0; i < N; i++) {
    graph[i] = input().split(" ").map(Number);
  }

  const floyd = () => {
    for (let k = 0; k < N; k++) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (graph[i][k] && graph[k][j]) {
            graph[i][j] = 1;
          }
        }
      }
    }
  };

  const process = () => {
    const result = [];
    floyd();

    for (let i = 0; i < N; i++) {
      result.push(graph[i].join(" "));
    }

    return result.join("\n");
  };

  return process();
};

console.log(solution());
