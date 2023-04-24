const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 2
2 1 2
4 3 2
1 4 3
1 2
3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => []);
  let visited = new Array(N + 1).fill(false);
  const result = [];

  for (let i = 0; i < N - 1; i++) {
    const [start, end, dist] = input().split(" ").map(Number);

    graph[start].push({ node: end, dist });
    graph[end].push({ node: start, dist });
  }

  const dfs = (current, end, dist) => {
    visited[current] = true;

    if (current === end) {
      result.push(dist);
      return;
    }

    for (let i = 0; i < graph[current].length; i++) {
      const next = graph[current][i];

      if (!visited[next.node]) {
        dfs(next.node, end, dist + next.dist);
      }
    }
  };

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);

    dfs(start, end, 0);
    visited = new Array(N + 1).fill(false);
  }

  return result.join("\n");
};

console.log(solution());
