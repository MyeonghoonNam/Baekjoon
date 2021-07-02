'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10
1 1 1 0 0 0 0 1 1 1
1 1 1 1 0 0 0 0 1 1
1 0 1 1 0 0 0 0 1 1
0 0 1 1 1 0 0 0 0 1
0 0 0 1 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 1 0 0 0
0 0 0 0 0 0 0 0 0 0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const N = Number(input());
const map = Array.from(new Array(N), () => new Array());
let visited = Array.from(new Array(N), () => new Array(N).fill(false));
let result = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < N; i++) {
  map[i] = input().split(' ').map(Number);
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const cycle = (startX, startY, mark) => {
  const queue = [[startX, startY]];

  visited[startX][startY] = true;
  map[startX][startY] = mark;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (checkRange(nx, ny) && map[nx][ny] === 1) {
        if (!visited[nx][ny]) {
          visited[nx][ny] = true;
          map[nx][ny] = mark;
          queue.push([nx, ny]);
        }
      }
    }
  }
};

const bfs = (mark) => {
  const queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === mark) {
        visited[i][j] = true;
        queue.push([i, j, 0]);
      }
    }
  }

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [x, y, dist] = queue.shift();

      for (let j = 0; j < 4; j++) {
        const nx = x + dx[j];
        const ny = y + dy[j];

        if (!checkRange(nx, ny)) continue;

        if (!visited[nx][ny]) {
          if (map[nx][ny] !== 0 && map[nx][ny] !== mark) return dist;
          else if (map[nx][ny] === 0) {
            visited[nx][ny] = true;
            queue.push([nx, ny, dist + 1]);
          }
        }
      }
    }
  }
};

const checkRange = (x, y) => {
  if (x >= 0 && x < N && y >= 0 && y < N) return true;
  else return false;
};

let mark = 1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j] && map[i][j] === 1) {
      cycle(i, j, mark++);
    }
  }
}

for (let i = 1; i < mark; i++) {
  visited = Array.from(new Array(N), () => new Array(N).fill(false));
  result = Math.min(result, bfs(i));
}

console.log(result);
