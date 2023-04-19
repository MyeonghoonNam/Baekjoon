const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
0 10 15 20
5 0 9 10
6 13 0 12
8 8 9 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const map = [];
  const visited = new Array(N).fill(false);
  let result = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    map.push(input().split(" ").map(Number));
  }

  const dfs = (cur, cnt, cost, root) => {
    if (cnt === N - 1 && map[cur][root] !== 0) {
      result = Math.min(result, cost + map[cur][root]);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i] === false && map[cur][i] !== 0) {
        visited[i] = true;
        dfs(i, cnt + 1, cost + map[cur][i], root);
        visited[i] = false;
      }
    }
  };

  for (let i = 0; i < N; i++) {
    visited[i] = true;
    dfs(i, 0, 0, i);
    visited[i] = false;
  }

  return result;
};

console.log(solution());
