const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5 4
.D.*
....
..X.
S.*.
....`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [R, C] = input().split(' ').map(Number);
  const map = [];
  const visited = Array.from(new Array(R), () => new Array(C).fill(0));
  const waterFilled = Array.from(new Array(R), () => new Array(C).fill(0));

  let result = 'KAKTUS';

  let startPos = 0;
  let endPos = 0;
  let waterPos = 0;

  for (let i = 0; i < R; i++) {
    map[i] = input().split('');

    for (let j = 0; j < C; j++) {
      if (map[i][j] === 'S') {
        startPos = [i, j];
      } else if (map[i][j] === 'D') {
        endPos = [i, j];
      } else if (map[i][j] === '*') {
        waterPos = [i, j];
      }
    }
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const waterBfs = () => {
    const q = [];
    let qIdx = 0;

    q.push(waterPos);

    while (qIdx < q.length) {
      const [x, y] = q[qIdx++];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkRange(nx, ny)) continue;

        if (waterFilled[nx][ny] === 0 && map[nx][ny] === '.') {
          waterFilled[nx][ny] = waterFilled[x][y] + 1;
          q.push([nx, ny]);
        }
      }
    }
  };

  const bfs = () => {
    const q = [];
    let qIdx = 0;

    q.push(startPos);
    while (qIdx < q.length) {
      const [x, y] = q[qIdx++];

      if (x === endPos[0] && y === endPos[1]) {
        result = visited[x][y];
        return;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkRange(nx, ny)) continue;

        if (
          visited[nx][ny] === 0 &&
          (map[nx][ny] === '.' || map[nx][ny] === 'D')
        ) {
          if (waterFilled[nx][ny] === 0) {
            // 도착점에 해당
            visited[nx][ny] = visited[x][y] + 1;
            q.push([nx, ny]);
          } else {
            if (waterFilled[nx][ny] > visited[x][y] + 1) {
              visited[nx][ny] = visited[x][y] + 1;
              q.push([nx, ny]);
            }
          }
        }
      }
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && x < R && y >= 0 && y < C) return true;
    else return false;
  };

  waterBfs();
  bfs();

  return result;
}
