'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7
6
1 2
2 3
1 5
5 2
5 6
4 7`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const edgeCount = Number(input());
  const network = Array.from(new Array(N + 1), () => new Array());
  const visited = new Array(N + 1).fill(false);

  let result = 0;

  for (let i = 0; i < edgeCount; i++) {
    const [x1, x2] = input().split(' ').map(Number);
    network[x1].push(x2);
    network[x2].push(x1);
  }

  const dfs = (idx) => {
    if (visited[idx]) return;

    visited[idx] = true;

    network[idx].forEach((v) => {
      if (!visited[v]) {
        dfs(v);
        result++;
      }
    });
  };

  dfs(1);

  return result;
}
