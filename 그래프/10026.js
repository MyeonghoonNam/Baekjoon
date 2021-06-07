'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const map = [];
  let visited = Array.from(new Array(N), () => new Array(N).fill(false));
  const result = [];

  for (let i = 0; i < N; i++) {
    map[i] = input().split('');
  }

  const init = () => {
    visited = Array.from(new Array(N), () => new Array(N).fill(false));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] === 'R') {
          map[i][j] = 'G';
        }
      }
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < N) return true;
    else return false;
  };

  const bfs = (pos) => {
    const q = [pos];
    let qIdx = 0;

    visited[pos[0]][pos[1]] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (qIdx < q.length) {
      const [x, y] = q[qIdx++];
      const color = map[x][y];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkRange(nx, ny)) continue;

        if (map[nx][ny] === color && !visited[nx][ny]) {
          visited[nx][ny] = true;
          q.push([nx, ny]);
        }
      }
    }
  };

  let answer1 = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        bfs([i, j]);
        answer1++;
      }
    }
  }

  result.push(answer1);

  init();

  let answer2 = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        bfs([i, j]);
        answer2++;
      }
    }
  }

  result.push(answer2);

  return result.join(' ');
}
