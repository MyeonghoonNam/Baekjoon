const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 구현
  // 다익스트라 알고리즘 : visited를 안쓰고 가중치 기록 그래프 이용(dist)
  console.log(Solution(input));

  function Solution(input) {
    const [M, N] = input.shift().split(' ').map(Number);

    const graph = Array.from(new Array(N), () => new Array());
    for (let i = 0; i < N; i++) {
      graph[i] = input.shift().split('').map(Number);
    }

    const dist = Array.from(new Array(N), () => new Array(M).fill(Infinity));

    Bfs(graph, dist, N, M);

    return dist[N - 1][M - 1];
  }

  function Bfs(graph, dist, N, M) {
    const q = [[0, 0]];

    dist[0][0] = 0;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (q.length > 0) {
      const [x, y] = q.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (CheckRange(nx, ny, N, M)) {
          if (graph[nx][ny] === 1) {
            if (dist[nx][ny] > dist[x][y]) {
              dist[nx][ny] = dist[x][y] + 1;
              q.push([nx, ny]);
            }
          } else if (graph[nx][ny] === 0) {
            if (dist[nx][ny] > dist[x][y]) {
              dist[nx][ny] = dist[x][y];
              q.push([nx, ny]);
            }
          }
        }
      }
    }
  }

  function CheckRange(x, y, N, M) {
    if (x >= 0 && x < N && y >= 0 && y < M) {
      return true;
    } else {
      return false;
    }
  }
});
