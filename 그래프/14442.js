'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6 4 2
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

const [N, M, K] = input().split(' ').map(Number);
const map = [];
const visited = Array.from(new Array(N), () =>
  Array.from(new Array(M), () => new Array(K + 1).fill(false))
);

let result = -1;

for (let i = 0; i < N; i++) {
  map[i] = input().split('').map(Number);
}

const checkRange = (x, y) => {
  if (x >= 0 && x < N && y >= 0 && y < M) return true;
  else return false;
};

const bfs = () => {
  const q = [[0, 0, K, 1]];

  visited[0][0][K] = true;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (q.length) {
    const [x, y, b, cnt] = q.shift();

    if (x === N - 1 && y === M - 1) {
      result = cnt;
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!checkRange(nx, ny)) continue;

      if (!visited[nx][ny][b]) {
        if (map[nx][ny] === 0) {
          visited[nx][ny][b] = true;
          q.push([nx, ny, b, cnt + 1]);
        } else if (map[nx][ny] === 1 && b > 0) {
          visited[nx][ny][b] = true;
          q.push([nx, ny, b - 1, cnt + 1]);
        }
      }
    }
  }
};

bfs();

console.log(result);
