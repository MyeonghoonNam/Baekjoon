'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6
5 4 3 2 3 4
4 3 2 3 4 5
3 2 9 5 6 6
2 1 2 3 4 5
3 2 1 6 5 4
6 6 6 6 6 6`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const map = [];

  let sharkPos = [];
  let eatCnt = 0;
  let sharkSize = 2;

  let minDist = 400;
  let minX = 20;
  let minY = 20;

  const checked = Array.from(new Array(N), () => new Array(N).fill(-1));

  let result = 0;

  for (let i = 0; i < N; i++) {
    map[i] = input().split(' ').map(Number);

    for (let j = 0; j < N; j++) {
      if (map[i][j] === 9) {
        sharkPos = [i, j];
        map[i][j] = 0;
      }
    }
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < N) return true;
    else return false;
  };

  const initChecked = () => {
    minDist = 400;
    minX = 20;
    minY = 20;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        checked[i][j] = -1;
      }
    }
  };

  const bfs = (pos) => {
    const q = [pos];
    let qIdx = 0;

    checked[pos[0]][pos[1]] = 0;

    while (qIdx < q.length) {
      const [x, y] = q[qIdx++];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkRange(nx, ny)) continue;

        if (checked[nx][ny] !== -1 || map[nx][ny] > sharkSize) continue;

        checked[nx][ny] = checked[x][y] + 1;

        if (map[nx][ny] !== 0 && map[nx][ny] < sharkSize) {
          if (minDist > checked[nx][ny]) {
            minX = nx;
            minY = ny;
            minDist = checked[nx][ny];
          } else if (minDist === checked[nx][ny]) {
            if (minX === nx) {
              if (minY > ny) {
                minX = nx;
                minY = ny;
              }
            } else if (minX > nx) {
              minX = nx;
              minY = ny;
            }
          }
        }

        q.push([nx, ny]);
      }
    }
  };

  while (1) {
    initChecked();

    bfs(sharkPos);

    if (minX !== 20 && minY !== 20) {
      result += checked[minX][minY];

      eatCnt++;

      if (eatCnt === sharkSize) {
        sharkSize++;
        eatCnt = 0;
      }

      map[minX][minY] = 0;

      sharkPos = [minX, minY];
    } else {
      break;
    }
  }

  return result;
}
