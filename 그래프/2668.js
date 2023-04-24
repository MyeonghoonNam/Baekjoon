const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
3
1
1
5
5
4
6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const graph = [0];

  for (let i = 1; i <= N; i++) {
    graph.push(Number(input()));
  }

  const visited = new Array(N + 1).fill(false);
  const finished = new Array(N + 1).fill(false);
  const result = [];

  const dfs = (current) => {
    visited[current] = true;

    let next = graph[current];

    if (!visited[next]) {
      dfs(next);
    } else if (!finished[next]) {
      while (next !== current) {
        result.push(next);
        next = graph[next];
      }

      result.push(current);
    }

    finished[current] = true;
  };

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  result.sort((a, b) => a - b);

  return `${result.length}\n${result.join("\n")}`;
};

console.log(solution());
