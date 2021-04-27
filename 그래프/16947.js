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
  const N = parseInt(input.shift());
  const graph = Array.from(new Array(N + 1), () => new Array());
  const cycle = new Array(N + 1).fill(false);
  let visited = [];
  const result = [];

  for (let i = 0; i < N; i++) {
    const [x, y] = input
      .shift()
      .split(' ')
      .map((el) => parseInt(el));

    insertEdge(x, y);
    insertEdge(y, x);
  }

  for (let i = 1; i <= N; i++) {
    Dfs(i, i, 0);
    visited = new Array(N + 1).fill(false);
  }

  for (let i = 1; i <= N; i++) {
    if (cycle[i]) {
      result.push(0);
    } else {
      Bfs(i, 0);
      visited = new Array(N + 1).fill(false);
    }
  }

  console.log(result.join(' '));
  process.exit();

  function insertEdge(x, y) {
    graph[x].push(y);
  }

  function Dfs(currentVertex, startVertex, edgeCount) {
    visited[currentVertex] = true;

    graph[currentVertex].forEach((v) => {
      if (!visited[v]) {
        Dfs(v, startVertex, edgeCount + 1);
      } else if (v === startVertex && edgeCount >= 2) {
        cycle[v] = true;
        return;
      }
    });
  }

  function Bfs(startVertex, dist) {
    const queue = [];
    queue.push([startVertex, dist]);

    while (queue.length > 0) {
      const [currentVertex, dist] = queue.shift();
      visited[currentVertex] = true;

      if (cycle[currentVertex]) {
        result.push(dist);
        return;
      }

      graph[currentVertex].forEach((v) => {
        if (!visited[v]) {
          queue.push([v, dist + 1]);
        }
      });
    }
  }
});
