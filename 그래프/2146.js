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
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  let N = 0;

  console.log(Solution(input));
  process.exit();

  function Solution(input) {
    N = parseInt(input.shift());

    const graph = Array.from(new Array(N), () => new Array());
    const visited = Array.from(new Array(N), () => new Array(N).fill(false));
    const dist = Array.from(new Array(N), () => new Array(N).fill(-1));

    for (let i = 0; i < N; i++) {
      graph[i] = input
        .shift()
        .split(' ')
        .map((el) => parseInt(el));
    }

    return Bfs(graph, visited, dist);
  }

  function NominateGroup(graph, visited, i, j, groupNumber) {
    const queue = [];
    queue.push([i, j]);

    graph[i][j] = groupNumber;
    visited[i][j] = true;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (CheckRange(nx, ny) && graph[nx][ny] === 1 && !visited[nx][ny]) {
          graph[nx][ny] = groupNumber;
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }

  function CheckRange(x, y) {
    if (x >= 0 && x < N && y >= 0 && y < N) {
      return true;
    } else {
      return false;
    }
  }

  function MeasureDist(graph, dist) {
    const queue = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (graph[i][j] !== 0) {
          dist[i][j] = 0;
          queue.push([i, j]);
        }
      }
    }

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (CheckRange(nx, ny) && dist[nx][ny] === -1) {
          dist[nx][ny] = dist[x][y] + 1;
          graph[nx][ny] = graph[x][y];

          queue.push([nx, ny]);
        }
      }
    }

    let min = 1000000;
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let k = 0; k < 4; k++) {
          const nx = x + dx[k];
          const ny = y + dy[k];

          if (CheckRange(nx, ny) && graph[x][y] !== graph[nx][ny]) {
            min = Math.min(min, dist[x][y] + dist[nx][ny]);
          }
        }
      }
    }

    return min;
  }

  function Bfs(graph, visited, dist) {
    let groupNumber = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (graph[i][j] === 1 && !visited[i][j]) {
          NominateGroup(graph, visited, i, j, ++groupNumber);
        }
      }
    }

    return MeasureDist(graph, dist);
  }
});
