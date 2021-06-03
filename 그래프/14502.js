'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4 6
0 0 0 0 0 0
1 0 0 0 0 2
1 1 1 0 0 2
0 0 0 0 0 2`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const map = [];
  let copymap = Array.from(new Array(N), () => new Array(M));
  let copymapvirus = Array.from(new Array(N), () => new Array(M));

  let result = 0;

  for (let i = 0; i < N; i++) {
    map[i] = input().split(' ').map(Number);
  }

  const copyMap = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        copymap[i][j] = map[i][j];
      }
    }
  };

  const copyMapVirus = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        copymapvirus[i][j] = copymap[i][j];
      }
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < M) return true;
    else return false;
  };

  const dfs = (cnt) => {
    if (cnt === 3) {
      bfs();
      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copymap[i][j] === 0) {
          copymap[i][j] = 1;
          dfs(cnt + 1);
          copymap[i][j] = 0;
        }
      }
    }
  };

  const bfs = () => {
    copyMapVirus();

    const q = [];
    let qIdx = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copymap[i][j] === 2) {
          q.push([i, j]);
        }
      }
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (qIdx < q.length) {
      // virus position
      const [x, y] = q[qIdx++];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (checkRange(nx, ny) && copymapvirus[nx][ny] === 0) {
          copymapvirus[nx][ny] = 2;
          q.push([nx, ny]);
        }
      }
    }

    // safety area
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copymapvirus[i][j] === 0) count++;
      }
    }

    result = Math.max(result, count);
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) {
        copyMap();
        copymap[i][j] = 1;
        dfs(1);
        copymap[i][j] = 0;
      }
    }
  }

  return result;
}
