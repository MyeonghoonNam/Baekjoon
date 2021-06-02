'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10 10
##########
#R#...##B#
#...#.##.#
#####.##.#
#......#.#
#.######.#
#.#....#.#
#.#.##...#
#O..#....#
##########`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const map = [];
  let result = 0;

  // 좌표정보 표시
  const visited = Array.from(new Array(10), () =>
    Array.from(new Array(10), () =>
      Array.from(new Array(10), () => new Array(10).fill(false))
    )
  );

  // 구슬과 구멍의 위치
  let rPos = [];
  let bPos = [];
  let hPos = [];

  for (let i = 0; i < N; i++) {
    map[i] = input().split('');

    for (let j = 0; j < M; j++) {
      if (map[i][j] === 'R') {
        rPos = [i, j];
      } else if (map[i][j] === 'B') {
        bPos = [i, j];
      } else if (map[i][j] === 'O') {
        hPos = [i, j];
      }
    }
  }

  const bfs = () => {
    const q = [[...rPos, ...bPos, 0]];
    let qIdx = 0;

    visited[rPos[0]][rPos[1]][bPos[0]][bPos[1]] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (qIdx < q.length) {
      const [rx, ry, bx, by, cnt] = q[qIdx++];

      if (cnt > 10) return;

      if (rx === hPos[0] && ry === hPos[1]) {
        result = 1;
        return;
      }

      for (let i = 0; i < 4; i++) {
        let nrx = rx;
        let nry = ry;
        let nbx = bx;
        let nby = by;

        while (1) {
          nrx += dx[i];
          nry += dy[i];

          if (map[nrx][nry] === '#') {
            nrx -= dx[i];
            nry -= dy[i];

            break;
          } else if (map[nrx][nry] === 'O') break;
        }

        while (1) {
          nbx += dx[i];
          nby += dy[i];

          if (map[nbx][nby] === '#') {
            nbx -= dx[i];
            nby -= dy[i];

            break;
          } else if (map[nbx][nby] === 'O') break;
        }

        if (nbx === hPos[0] && nby === hPos[1]) continue;

        if (nrx === nbx && nry === nby) {
          switch (i) {
            case 0:
              rx < bx ? nbx++ : nrx++;
              break;
            case 1:
              rx < bx ? nrx-- : nbx--;
              break;
            case 2:
              ry < by ? nby++ : nry++;
              break;
            case 3:
              ry < by ? nry-- : nby--;
              break;
          }
        }

        if (!visited[nrx][nry][nbx][nby]) {
          visited[nrx][nry][nbx][nby] = true;
          q.push([nrx, nry, nbx, nby, cnt + 1]);
        }
      }
    }
  };

  bfs();

  return result;
}
