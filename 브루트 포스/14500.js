'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5 5
1 2 3 4 5
5 4 3 2 1
2 3 4 5 6
6 5 4 3 2
1 2 1 2 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const map = [];
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));

  let result = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    map[i] = input().split(' ').map(Number);
  }

  // ㅜ, ㅗ, ㅏ, ㅓ 모양의 도형 검사
  const checkShape = (x, y) => {
    const dx = [
      [0, 0, 0, 1],
      [0, 0, 0, -1],
      [0, 1, 2, 1],
      [0, -1, 0, 1],
    ];

    const dy = [
      [0, 1, 2, 1],
      [0, 1, 2, 1],
      [0, 0, 0, 1],
      [0, 1, 1, 1],
    ];

    for (let i = 0; i < 4; i++) {
      let sum = 0;
      let flag = true;

      for (let j = 0; j < 4; j++) {
        const nx = x + dx[i][j];
        const ny = y + dy[i][j];

        if (checkRange(nx, ny)) {
          sum += map[nx][ny];
        } else {
          flag = false;
          break;
        }
      }

      if (flag) result = Math.max(result, sum);
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < M) return true;
    else return false;
  };

  const dfs = (x, y, sum, cnt) => {
    if (cnt === 4) {
      if (result < sum) result = sum;

      return;
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (checkRange(nx, ny) && !visited[nx][ny]) {
        visited[nx][ny] = true;
        dfs(nx, ny, sum + map[nx][ny], cnt + 1);
        visited[nx][ny] = false;
      }
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, map[i][j], 1);
      visited[i][j] = false;
      checkShape(i, j);
    }
  }

  return result;
}
