'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3 3
101
010
101`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const map = [];
  const group = Array.from(new Array(N), () => new Array(M).fill(-1));
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));
  const result_map = Array.from(new Array(N), () => new Array(M).fill(0));

  let groupNumber = 0;
  const groupSize = [];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    map[i] = input().split('').map(Number);
  }

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < M) return true;
    else return false;
  };

  const bfs = (a, b) => {
    const q = [[a, b]];
    let qIdx = 0;
    let size = 1;

    group[a][b] = groupNumber;
    visited[a][b] = true;

    while (qIdx < q.length) {
      const [x, y] = q[qIdx++];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkRange(nx, ny)) continue;

        if (map[nx][ny] === 0 && !visited[nx][ny]) {
          visited[nx][ny] = true;
          group[nx][ny] = groupNumber;
          q.push([nx, ny]);
          size++;
        }
      }
    }

    groupSize.push(size);
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0 && !visited[i][j]) {
        bfs(i, j);
        groupNumber++;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1) {
        const dist = new Set();

        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];

          if (!checkRange(nx, ny)) continue;

          if (map[nx][ny] === 0) {
            if (!dist.has(group[nx][ny])) {
              dist.add(group[nx][ny]);
              result_map[i][j] += groupSize[group[nx][ny]];
            }
          }
        }

        result_map[i][j] += 1;
        result_map[i][j] %= 10;
      }
    }
  }

  const result = result_map.reduce((acc, cur) => {
    return acc.concat(cur.join('')) + '\n';
  }, []);

  return result;
}
