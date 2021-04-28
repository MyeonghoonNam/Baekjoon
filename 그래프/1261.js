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
  console.log(Solution(input));

  function Solution(input) {
    const [M, N] = input.shift().split(' ').map(Number);

    const graph = Array.from(new Array(N + 1), () => new Array());

    for (let i = 1; i <= N; i++) {
      graph[i] = input.shift().split('').map(Number);
    }

    const dist = Array.from(new Array(N + 1), () => new Array(M + 1).fill(-1));

    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= M; j++) {
        if (graph[i][j - 1] === 0) {
          dist[i][j] = 0;
        }
      }
    }

    const visited = Array.from(new Array(N + 1), () =>
      new Array(M + 1).fill(false)
    );

    // Bfs
    const q = [[1, 1]];

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    while (q.length > 0) {
      const [x, y] = q.shift();

      if (visited[x][y]) continue;

      visited[x][y] = true;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (CheckRange(nx, ny, N, M) && !visited[nx][ny]) {
          if (nx === N && ny === M) {
            return dist[x][y];
          } else if (dist[nx][ny] === -1) {
            dist[nx][ny] = dist[x][y] + 1;
            q.push([nx, ny]);
          } else if (dist[nx][ny] === 0) {
            q.push([nx, ny]);
          }
        }
      }
    }
  }

  function CheckRange(x, y, N, M) {
    if (x >= 1 && x <= N && y >= 1 && y <= M) {
      return true;
    } else {
      return false;
    }
  }
});
