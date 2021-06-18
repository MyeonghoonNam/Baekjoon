'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `9
____*____
*********
____*____
____*____
____*____
___*_*___
___*_*___
___*_*___
___*_*___`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const map = Array.from(new Array(N), () => new Array(N));

  for (let i = 0; i < N; i++) {
    map[i] = input().split('');
  }

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < N) return true;
    else return false;
  };

  const getLength = (x, y, dir) => {
    let length = 0;
    while (true) {
      if (checkRange(x, y) && map[x][y] === '*') length++;
      else return length;

      x = x + dx[dir];
      y = y + dy[dir];
    }
  };

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  let hx = 0;
  let hy = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let flag = 0;
      for (let k = 0; k < 4; k++) {
        const nx = i + dx[k];
        const ny = j + dy[k];

        if (checkRange(nx, ny) && map[i][j] === '*' && map[nx][ny] === '*') {
          flag = 1;
        } else {
          flag = 0;
          break;
        }
      }

      if (flag) {
        hx = i;
        hy = j;
      }
    }
  }

  const result = [];

  // 왼팔
  result.push(getLength(hx, hy - 1, 2));

  // 오른팔
  result.push(getLength(hx, hy + 1, 3));

  // 허리
  result.push(getLength(hx + 1, hy, 1));

  // 왼다리
  result.push(getLength(hx + result[2] + 1, hy - 1, 1));

  // 오른다리
  result.push(getLength(hx + result[2] + 1, hy + 1, 1));

  return `${hx + 1} ${hy + 1}\n${result.join(' ')}`;
}
