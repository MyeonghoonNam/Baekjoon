'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `1 1
0
2 2
0 1
1 0
3 2
1 1 1
1 1 1
5 4
1 0 1 0 0
1 0 0 0 0
1 0 1 0 1
1 0 0 1 0
5 4
1 1 1 0 1
1 0 1 0 1
1 0 1 0 1
1 0 1 1 1
5 5
1 0 1 0 1
0 0 0 0 0
1 0 1 0 1
0 0 0 0 0
1 0 1 0 1
0 0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const result = [];

  while (true) {
    const [w, h] = input().split(' ').map(Number);
    let count = 0;

    if (w === 0 && h === 0) break;

    const map = new Array(h);
    const visited = Array.from(new Array(h), () => new Array(w).fill(false));

    for (let i = 0; i < h; i++) {
      map[i] = input().split(' ').map(Number);
    }

    const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
    const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

    const dfs = (x, y) => {
      if (visited[x][y]) return;

      visited[x][y] = true;

      for (let i = 0; i < 8; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (checkRange(nx, ny) && map[nx][ny] === 1) {
          if (!visited[nx][ny]) {
            dfs(nx, ny);
          }
        }
      }
    };

    const checkRange = (x, y) => {
      if (x >= 0 && x < h && y >= 0 && y < w) return true;
      else return false;
    };

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (!visited[i][j] && map[i][j] === 1) {
          dfs(i, j);
          count++;
        }
      }
    }

    result.push(count);
  }

  return result.join('\n');
}
