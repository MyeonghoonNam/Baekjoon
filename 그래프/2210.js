const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 2 1
1 1 1 1 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const board = new Array(5);
  const result = new Set();

  for (let i = 0; i < 5; i++) {
    board[i] = input().split(' ').map(Number);
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      bfs(i, j, board, result);
    }
  }

  return result.size;
};

const bfs = (x, y, board, result) => {
  const queue = [[x, y, 0, `${board[x][y]}`]]; // 시작 좌표, 이동 횟수, 이동 경로(문자열)

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (queue.length > 0) {
    const [x, y, count, path] = queue.shift();

    if (count === 5) {
      if (!result.has(path)) {
        result.add(path);
      }

      continue;
    }

    for (let i = 0; i < 5; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (checkBoardRange(nx, ny)) {
        queue.push([nx, ny, count + 1, path + String(board[nx][ny])]);
      }
    }
  }
};

const checkBoardRange = (x, y) => {
  if (x >= 0 && x < 5 && y >= 0 && y < 5) return true;
  else return false;
};

console.log(solution());
