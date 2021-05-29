'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6 2
.#
.#
.#
o#
o#
##`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ');
  const map = new Array(N);

  let coinPos = [];

  for (let i = 0; i < N; i++) {
    map[i] = input().split('');

    for (let j = 0; j < M; j++) {
      if (map[i][j] === 'o') {
        coinPos.push([i, j]);
      }
    }
  }

  // 동전이 맵 밖으로 떨어지는지 체크
  const checkRange = (x, y) => {
    if (x < 0 || x >= N || y < 0 || y >= M) return true;
    else return false;
  };

  const dfs = (coinPos1, coinPos2, cnt) => {
    const [x1, y1] = coinPos1;
    const [x2, y2] = coinPos2;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    let result = -1;

    if (cnt > 10) {
      return -1;
    }

    if (checkRange(x1, y1) && checkRange(x2, y2)) return -1;
    else if (checkRange(x1, y1) || checkRange(x2, y2)) return cnt;

    for (let i = 0; i < 4; i++) {
      let nx1 = x1 + dx[i];
      let nx2 = x2 + dx[i];
      let ny1 = y1 + dy[i];
      let ny2 = y2 + dy[i];

      if (
        !checkRange(nx1, ny1) &&
        !checkRange(nx2, ny2) &&
        map[nx1][ny1] === '#'
      ) {
        nx1 = x1;
        ny1 = y1;
      }

      if (
        !checkRange(nx1, ny1) &&
        !checkRange(nx2, ny2) &&
        map[nx2][ny2] === '#'
      ) {
        nx2 = x2;
        ny2 = y2;
      }

      const nextCnt = dfs([nx1, ny1], [nx2, ny2], cnt + 1);

      if (nextCnt === -1) continue;
      if (result === -1 || result > nextCnt) result = nextCnt;
    }

    return result;
  };

  return dfs(coinPos[0], coinPos[1], 0);
}
