const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6 4 1
0100
1110
1000
0000
0111
0000`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const [N, M, K] = input().split(' ').map(Number);
const map = [];
const visited = Array.from(new Array(N), () =>
  Array.from(new Array(M), () => new Array(K + 1).fill(false))
);

let result = -1;

for (let i = 0; i < N; i++) {
  map[i] = input().split('').map(Number);
}

const checkRange = (x, y) => {
  if (x >= 0 && x < N && y >= 0 && y < M) return true;
  else return false;
};

const bfs = () => {
  // x, y, 부수기 가능한 벽의 수, 거리, 낮과 밤(낮 : 0, 밤 : 1)
  const q = [[0, 0, K, 1, 0]];
  let qIdx = 0;

  visited[0][0][K] = true;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (qIdx < q.length) {
    const [x, y, b, cnt, time] = q[qIdx++];

    if (x === N - 1 && y === M - 1) {
      result = cnt;
      return;
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (!checkRange(nx, ny)) continue;

      if (map[nx][ny] === 0) {
        if (!visited[nx][ny][b]) {
          visited[nx][ny][b] = true;

          if (time === 0) q.push([nx, ny, b, cnt + 1, 1]);
          else q.push([nx, ny, b, cnt + 1, 0]);
        }
      } else if (map[nx][ny] === 1) {
        if (b > 0) {
          if (!visited[nx][ny][b - 1]) {
            if (time === 0) {
              visited[nx][ny][b - 1] = true;
              q.push([nx, ny, b - 1, cnt + 1, 1]);
            } else {
              q.push([x, y, b, cnt + 1, 0]);
            }
          }
        }
      }
    }
  }
};

bfs();

console.log(result);
