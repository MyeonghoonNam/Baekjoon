'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10
6 B2 1 B3
2 C4 9 C3
6 D3 8 E3
7 E1 4 F1
8 B7 4 B8
3 F5 2 F6
7 F7 6 F8
5 G4 9 G5 
7 I8 8 I9
7 C9 2 B9
C5 A3 D9 I4 A9 E5 A2 C6 I1
11
5 I9 2 H9
6 A5 7 A6
4 B8 6 C8
3 B5 8 B4
3 C3 2 D3
9 D2 8 E2
3 G2 5 H2
1 A2 8 A1
1 H8 3 I8
8 I3 7 I4
4 I6 9 I7
I5 E6 D1 F2 B3 G9 H7 C9 E5
0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  let map = [];
  let row = [];
  let col = [];
  let square = [];
  let tile = [];

  const dx = [1, 0];
  const dy = [0, 1];
  let flag = false;

  const dfs = (cnt) => {
    if (flag) return;

    if (cnt === 81) {
      const result = map.reduce((arr, cur) => {
        return arr.concat(cur.join(''));
      }, []);

      console.log(result.join('\n'));

      flag = true;
      return;
    }

    const x = parseInt(cnt / 9);
    const y = cnt % 9;

    if (map[x][y] === 0) {
      for (let k = 0; k < 2; k++) {
        const nx = x + dx[k];
        const ny = y + dy[k];

        if (nx >= 9 || ny >= 9) continue;
        if (map[nx][ny] !== 0) continue;

        for (let i = 1; i < 9; i++) {
          for (let j = i + 1; j <= 9; j++) {
            if (!tile[i][j]) {
              tile[i][j] = true;

              // i, j 순서
              if (
                !row[x][i] &&
                !col[y][i] &&
                !square[parseInt(x / 3) * 3 + parseInt(y / 3)][i] &&
                !row[nx][j] &&
                !col[ny][j] &&
                !square[parseInt(nx / 3) * 3 + parseInt(ny / 3)][j]
              ) {
                map[x][y] = i;
                map[nx][ny] = j;

                row[x][i] = true;
                row[nx][j] = true;

                col[y][i] = true;
                col[ny][j] = true;

                square[parseInt(x / 3) * 3 + parseInt(y / 3)][i] = true;
                square[parseInt(nx / 3) * 3 + parseInt(ny / 3)][j] = true;

                dfs(cnt + 1);

                map[x][y] = 0;
                map[nx][ny] = 0;

                row[x][i] = false;
                row[nx][j] = false;

                col[y][i] = false;
                col[ny][j] = false;

                square[parseInt(x / 3) * 3 + parseInt(y / 3)][i] = false;
                square[parseInt(nx / 3) * 3 + parseInt(ny / 3)][j] = false;
              }

              // j, i 순서로 뒤집은 경우
              if (
                !row[x][j] &&
                !col[y][j] &&
                !square[parseInt(x / 3) * 3 + parseInt(y / 3)][j] &&
                !row[nx][i] &&
                !col[ny][i] &&
                !square[parseInt(nx / 3) * 3 + parseInt(ny / 3)][i]
              ) {
                map[x][y] = j;
                map[nx][ny] = i;

                row[x][j] = true;
                row[nx][i] = true;

                col[y][j] = true;
                col[ny][i] = true;

                square[parseInt(x / 3) * 3 + parseInt(y / 3)][j] = true;
                square[parseInt(nx / 3) * 3 + parseInt(ny / 3)][i] = true;

                dfs(cnt + 1);

                map[x][y] = 0;
                map[nx][ny] = 0;

                row[x][j] = false;
                row[nx][i] = false;

                col[y][j] = false;
                col[ny][i] = false;

                square[parseInt(x / 3) * 3 + parseInt(y / 3)][j] = false;
                square[parseInt(nx / 3) * 3 + parseInt(ny / 3)][i] = false;
              }

              tile[i][j] = false;
            }
          }
        }
      }
    } else {
      dfs(cnt + 1);
    }
  };

  let T = 0;
  while (true) {
    map = Array.from(new Array(9), () => new Array(9).fill(0));
    row = Array.from(new Array(9), () => new Array(10).fill(false));
    col = Array.from(new Array(9), () => new Array(10).fill(false));
    square = Array.from(new Array(9), () => new Array(10).fill(false));

    tile = Array.from(new Array(10), () => new Array(10).fill(false));

    flag = false;

    const N = Number(input());

    if (N === 0) break;
    T++;

    for (let i = 0; i < N; i++) {
      const [num1, pos1, num2, pos2] = input().split(' ');

      const x1 = pos1[0].charCodeAt(0) - 'A'.charCodeAt(0);
      const y1 = pos1[1] - 1;
      const x2 = pos2[0].charCodeAt(0) - 'A'.charCodeAt(0);
      const y2 = pos2[1] - 1;

      map[x1][y1] = num1;
      map[x2][y2] = num2;

      row[x1][num1] = true;
      row[x2][num2] = true;

      col[y1][num1] = true;
      col[y2][num2] = true;

      square[parseInt(x1 / 3) * 3 + parseInt(y1 / 3)][num1] = true;
      square[parseInt(x2 / 3) * 3 + parseInt(y2 / 3)][num2] = true;

      if (num1 < num2) {
        tile[num1][num2] = true;
      } else {
        tile[num2][num1] = true;
      }
    }

    const pos = input().split(' ');

    for (let i = 0; i < 9; i++) {
      const x = pos[i][0].charCodeAt(0) - 'A'.charCodeAt(0);
      const y = pos[i][1] - 1;

      map[x][y] = i + 1;
      row[x][i + 1] = true;
      col[y][i + 1] = true;
      square[parseInt(x / 3) * 3 + parseInt(y / 3)][i + 1] = true;
    }

    console.log('Puzzle ' + T);
    dfs(0);
  }
}
