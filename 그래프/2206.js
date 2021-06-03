'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6 4
0100
1110
1000
0000
0111
0000`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const map = [];
  const visited = Array.from(new Array(N), () =>
    Array.from(new Array(M), () => new Array(2).fill(false))
  );

  for (let i = 0; i < N; i++) {
    map[i] = input().split('').map(Number);
  }

  let result = -1;

  const bfs = () => {
    const q = [[0, 0, 0, 1]];
    let qIdx = 0;

    visited[0][0][0] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (qIdx < q.length) {
      const [x, y, b, cnt] = q[qIdx++];

      if (x === N - 1 && y === M - 1) {
        result = cnt;
        return;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (checkRange(nx, ny)) {
          if (map[nx][ny] === 1 && b === 0) {
            visited[nx][ny][b + 1] = true;
            q.push([nx, ny, b + 1, cnt + 1]);
          } else if (map[nx][ny] === 0 && !visited[nx][ny][b]) {
            visited[nx][ny][b] = true;
            q.push([nx, ny, b, cnt + 1]);
          }
        }
      }
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < M) return true;
    else return false;
  };

  bfs();

  return result;
}
