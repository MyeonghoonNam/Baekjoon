'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7 8
.......
......C
......*
*****.*
....*..
....*..
.C..*..
.......`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [W, H] = input().split(' ').map(Number);
  const map = [];
  const visited = Array.from(new Array(H), () => new Array(W).fill(Infinity));

  let startPos = [];
  let endPos = [];

  let flag = 0;
  for (let i = 0; i < H; i++) {
    map[i] = input().split('');

    for (let j = 0; j < W; j++) {
      if (map[i][j] === 'C') {
        if (flag === 0) {
          startPos = [i, j];
          flag++;
        } else {
          endPos = [i, j];
        }
      }
    }
  }

  const checkRange = (x, y) => {
    if (x >= 0 && x < H && y >= 0 && y < W) return true;
    else return false;
  };

  const bfs = () => {
    const [sx, sy] = startPos;

    const q = [];
    let qIdx = 0;

    for (let i = 0; i < 4; i++) {
      q.push([sx, sy, i, 0]);
    }

    visited[sx][sy] = 0;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (qIdx < q.length) {
      const [x, y, dir, cnt] = q[qIdx++];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        let nCnt = cnt;

        if (!checkRange(nx, ny)) continue;

        if (map[nx][ny] === '*') continue;

        if (dir !== i) nCnt = nCnt + 1;

        if (visited[nx][ny] >= nCnt) {
          visited[nx][ny] = nCnt;
          q.push([nx, ny, i, nCnt]);
        }
      }
    }
  };

  bfs();

  return visited[endPos[0]][endPos[1]];
}
