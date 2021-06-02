'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6
5 1 0 5`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const [r1, c1, r2, c2] = input().split(' ').map(Number);
  const visited = Array.from(new Array(200), () => new Array(200).fill(false));
  let result = -1;

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < N) return true;
    else return false;
  };

  const bfs = () => {
    const q = [[r1, c1, 0]];
    let qIdx = 0;

    visited[r1][c1] = true;

    const dx = [-2, -2, 0, 0, 2, 2];
    const dy = [-1, 1, -2, 2, -1, 1];

    while (qIdx < q.length) {
      const [x, y, cnt] = q[qIdx++];

      if (x === r2 && y === c2) {
        result = cnt;
        return;
      }

      for (let i = 0; i < 6; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (checkRange(nx, ny) && !visited[nx][ny]) {
          visited[nx][ny] = true;
          q.push([nx, ny, cnt + 1]);
        }
      }
    }
  };

  if (r1 === r2 && c1 === c2) return 0;

  bfs(r1, c1);

  return result;
}
