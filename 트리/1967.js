const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `12
1 2 3
1 3 2
2 4 5
3 5 11
3 6 9
4 7 1
4 8 7
5 9 15
5 10 4
6 11 6
6 12 10`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 트리에서 지름이란, 가장 먼 두 정점 사이의 거리 혹은 가장 먼 두 정점을 연결하는 경로를 의미한다. 선형 시간안에 트리에서 지름을 구하는 방법은 다음과 같다:

// 1. 트리에서 임의의 정점 x를 잡는다.
// 2. 정점 x에서 가장 먼 정점 y를 찾는다.
// 3. 정점 y에서 가장 먼 정점 z를 찾는다.

// 트리의 지름은 정점 y와 정점 z를 연결하는 경로다.

console.log(Solution());

function Solution() {
  const N = Number(input());
  const graph = Array.from(new Array(N + 1), () => new Array());

  let dist = [];
  let visited = [];

  for (let i = 0; i < N - 1; i++) {
    const [v1, v2, dist] = input().split(' ').map(Number);

    graph[v1].push([v2, dist]);
    graph[v2].push([v1, dist]);
  }

  const bfs = (start) => {
    dist = new Array(N + 1).fill(0);
    visited = new Array(N + 1).fill(false);

    const q = [start];
    visited[start] = true;

    while (q.length > 0) {
      const cur = q.shift();

      for (let i = 0; i < graph[cur].length; i++) {
        const next = graph[cur][i][0];

        if (!visited[next]) {
          visited[next] = true;
          dist[next] = dist[cur] + graph[cur][i][1];
          q.push(next);
        }
      }
    }
  };

  bfs(1);

  let start = 0;
  dist.forEach((d, i) => {
    if (d > dist[start]) {
      start = i;
    }
  });

  bfs(start);

  const result = Math.max(...dist);

  return result;
}
