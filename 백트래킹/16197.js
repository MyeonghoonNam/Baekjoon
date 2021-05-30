'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5 3
###
.o.
#.#
.o.
###`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const map = new Array(N);
  const coinPos = [];

  for (let i = 0; i < N; i++) {
    map[i] = input().split('');

    for (let j = 0; j < M; j++) {
      if (map[i][j] === 'o') coinPos.push([i, j]);
    }
  }

  const checkRange = (x, y) => {
    if (x < 0 || x >= N || y < 0 || y >= M) return true;
    else return false;
  };

  // dfs 풀이
  // const dfs = (coinPos1, coinPos2, cnt) => {
  //   const [x1, y1] = coinPos1;
  //   const [x2, y2] = coinPos2;
  //   let result = -1;

  //   if (cnt > 10) return -1;

  //   if (checkRange(x1, y1) && checkRange(x2, y2)) return -1;
  //   else if (checkRange(x1, y1) || checkRange(x2, y2)) return cnt;

  //   const dx = [-1, 1, 0, 0];
  //   const dy = [0, 0, -1, 1];

  //   for (let i = 0; i < 4; i++) {
  //     let nx1 = x1 + dx[i];
  //     let nx2 = x2 + dx[i];
  //     let ny1 = y1 + dy[i];
  //     let ny2 = y2 + dy[i];

  //     if (!checkRange(nx1, ny1) && map[nx1][ny1] === '#') {
  //       nx1 = x1;
  //       ny1 = y1;
  //     }

  //     if (!checkRange(nx2, ny2) && map[nx2][ny2] === '#') {
  //       nx2 = x2;
  //       ny2 = y2;
  //     }

  //     const nextCnt = dfs([nx1, ny1], [nx2, ny2], cnt + 1);

  //     if (nextCnt === -1) continue;
  //     if (result === -1 || result > nextCnt) result = nextCnt;
  //   }

  //   return result;
  // };

  // bfs 풀이
  const bfs = (coinPos1, coinPos2, cnt) => {
    const q = [[...coinPos1, ...coinPos2, cnt]];
    let qIdx = 0;

    const visited = new Set();

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (qIdx < q.length) {
      const [x1, y1, x2, y2, cnt] = q[qIdx];
      qIdx++;

      visited.add([x1, y1, x2, y2].join(''));

      if (cnt > 10) break;

      for (let i = 0; i < 4; i++) {
        let nx1 = x1 + dx[i];
        let nx2 = x2 + dx[i];
        let ny1 = y1 + dy[i];
        let ny2 = y2 + dy[i];

        if (checkRange(nx1, ny1) && checkRange(nx2, ny2)) continue;

        if (
          (checkRange(nx1, ny1) && !checkRange(nx2, ny2)) ||
          (!checkRange(nx1, ny1) && checkRange(nx2, ny2))
        ) {
          if (cnt + 1 > 10) return -1;

          return cnt + 1;
        }

        if (map[nx1][ny1] === '#' && map[nx2][ny2] === '#') {
          continue;
        }

        if (map[nx1][ny1] === '#') {
          nx1 = x1;
          ny1 = y1;
        } else if (map[nx2][ny2] === '#') {
          nx2 = x2;
          ny2 = y2;
        }

        if (!visited.has([nx1, ny1, nx2, ny2].join(''))) {
          q.push([nx1, ny1, nx2, ny2, cnt + 1]);
          visited.add([nx1, ny1, nx2, ny2].join(''));
        }
      }
    }

    return -1;
  };

  // return dfs(coinPos[0], coinPos[1], 0);
  return bfs(coinPos[0], coinPos[1], 0);
}
