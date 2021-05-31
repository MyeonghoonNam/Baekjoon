'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const MAX = 9;

  const row = Array.from(new Array(MAX), () => new Array(MAX).fill(false));
  const col = Array.from(new Array(MAX), () => new Array(MAX).fill(false));
  const square = Array.from(new Array(MAX), () => new Array(MAX).fill(false));

  const map = [];
  for (let i = 0; i < MAX; i++) {
    map[i] = input().split(' ').map(Number);

    for (let j = 0; j < MAX; j++) {
      if (map[i][j] !== 0) {
        row[i][map[i][j]] = true;
        col[j][map[i][j]] = true;
        square[parseInt(i / 3) * 3 + parseInt(j / 3)][map[i][j]] = true;
      }
    }
  }

  const print = () => {
    const result = map.reduce((acc, cur) => {
      return acc.concat(cur.join(' '));
    }, []);

    console.log(result.join('\n'));
  };

  const dfs = (cnt) => {
    const x = parseInt(cnt / MAX);
    const y = cnt % MAX;

    if (cnt === 81) {
      print();
      process.exit();
    }

    if (map[x][y] === 0) {
      for (let i = 1; i <= 9; i++) {
        if (
          !row[x][i] &&
          !col[y][i] &&
          !square[parseInt(x / 3) * 3 + parseInt(y / 3)][i]
        ) {
          row[x][i] = true;
          col[y][i] = true;
          square[parseInt(x / 3) * 3 + parseInt(y / 3)][i] = true;
          map[x][y] = i;
          dfs(cnt + 1);
          map[x][y] = 0;
          row[x][i] = false;
          col[y][i] = false;
          square[parseInt(x / 3) * 3 + parseInt(y / 3)][i] = false;
        }
      }
    } else {
      dfs(cnt + 1);
    }
  };

  dfs(0);
}
