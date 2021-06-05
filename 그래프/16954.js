'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `........
........
........
........
........
........
........
........`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const map = [];
  const visited = Array.from(new Array(8), () =>
    Array.from(new Array(8), () => new Array(9).fill(false))
  );

  let result = 0;

  for (let i = 0; i < 8; i++) {
    map[i] = input().split('');
  }

  const checkRange = (x, y) => {
    if (x >= 0 && x < 8 && y >= 0 && y < 8) return true;
    else return false;
  };

  const bfs = () => {
    // x, y, t
    const q = [[7, 0, 0]];
    let qIdx = 0;

    visited[7][0][0] = true;

    const dx = [-1, -1, 0, 1, 1, 1, 0, -1, 0];
    const dy = [0, 1, 1, 1, 0, -1, -1, -1, 0];

    while (qIdx < q.length) {
      const [x, y, t] = q[qIdx++];

      for (let i = 0; i < 9; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        const nt = t + 1;

        if (nt === 8) {
          result = 1;
          return;
        }

        // 범위 밖
        if (!checkRange(nx, ny)) continue;

        // 벽에 막힌 경우
        if (nx - t >= 0 && map[nx - t][ny] === '#') continue;

        // 내려올 벽에 막힐 경우
        if (nx - t - 1 >= 0 && map[nx - t - 1][ny] === '#') continue;

        if (!visited[nx][ny][nt]) {
          visited[nx][ny][nt] = true;
          q.push([nx, ny, nt]);
        }
      }
    }
  };

  bfs();

  return result;
}
