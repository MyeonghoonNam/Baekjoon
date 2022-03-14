const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const M = Number(input());
  const result = [];
  const graph = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(Infinity)
  );

  // 자기 자신에 대한 경로 값 초기화
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (i === j) {
        graph[i][j] = 0;
      }
    }
  }

  // 간선 정보에 의한 경로 값 갱신
  for (let i = 0; i < M; i++) {
    const [start, end, dist] = input().split(" ").map(Number);

    if (graph[start][end] > dist) {
      graph[start][end] = dist;
    }
  }

  // 플로이드 워셜 알고리즘을 통한 경로 값 갱신
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  // Infinity 값을 0으로 갱신
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (graph[i][j] === Infinity) graph[i][j] = 0;
    }

    result.push(graph[i].slice(1).join(" "));
  }

  return result.join("\n");
};

console.log(solution());
