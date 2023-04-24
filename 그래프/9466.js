const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
7
3 1 3 7 3 4 6
8
1 2 3 4 5 6 7 8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());
  while (T--) {
    const N = Number(input());
    const graph = [0, ...input().split(" ").map(Number)];
    const visited = new Array(N + 1).fill(false);
    const finished = new Array(N + 1).fill(false);
    const hasTeam = [];

    const dfs = (current) => {
      visited[current] = true;

      let next = graph[current];

      if (!visited[next]) {
        dfs(next);
      } else if (!finished[next]) {
        while (next !== current) {
          hasTeam.push(next);
          next = graph[next];
        }

        hasTeam.push(current);
      }

      finished[current] = true;
    };

    for (let i = 1; i <= N; i++) {
      if (!visited[i]) {
        dfs(i);
      }
    }

    result.push(N - hasTeam.length);
  }

  return result.join("\n");
};

console.log(solution());
