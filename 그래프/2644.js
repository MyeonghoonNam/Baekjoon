const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
7 3
7
1 2
1 3
2 7
2 8
2 9
4 5
4 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const [from, to] = input().split(" ").map(Number);
  const M = Number(input());
  const graph = Array.from(new Array(N + 1), () => new Array());
  const visited = new Array(N + 1).fill(false);
  let result = 0;
  let flagResult = false;

  for (let i = 0; i < M; i++) {
    const [from, to] = input().split(" ").map(Number);
    graph[from].push(to);
    graph[to].push(from);
  }

  const dfs = (node, count) => {
    visited[node] = true;

    if (node === to) {
      result = count;
      flagResult = true;
      return;
    }

    for (let i = 0; i < graph[node].length; i++) {
      const v = graph[node][i];

      if (!visited[v]) {
        dfs(v, count + 1);
        if (flagResult) return;
      }
    }
  };

  dfs(from, 0);

  if (!flagResult) {
    result = -1;
  }

  return result;
};

console.log(solution());
