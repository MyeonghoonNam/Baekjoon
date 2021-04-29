var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 구현
// 다익스트라 알고리즘 : visited를 안쓰고 가중치 기록 그래프 이용(dist)
const [MN, ...graph] = input;
const [M, N] = MN.split(' ').map(Number);
const dist = Array.from(new Array(N), () => new Array(M).fill(Infinity));

function Bfs() {
  const q = [[0, 0]];

  dist[0][0] = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (q.length > 0) {
    const [x, y] = q.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

      if (graph[nx][ny] === '1') {
        if (dist[nx][ny] > dist[x][y] + 1) {
          dist[nx][ny] = dist[x][y] + 1;
          q.push([nx, ny]);
        }
      } else if (graph[nx][ny] === '0') {
        if (dist[nx][ny] > dist[x][y]) {
          dist[nx][ny] = dist[x][y];
          q.push([nx, ny]);
        }
      }
    }
  }
}

Bfs();
console.log(dist[N - 1][M - 1]);
