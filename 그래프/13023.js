const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  // 구현
  const [n, m] = input[0];
  input.shift();

  const graph = Array.from(new Array(n), () => new Array());
  const visited = Array.from(new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    const [a, b] = input[i];

    graph[a].push(b);
    graph[b].push(a);
  }

  for (let i = 0; i < n; i++) {
    visited[i] = 1;
    dfs(i);
    visited[i] = 0;
  }

  console.log(0);
  process.exit();

  function dfs(n) {
    if (visited[n] > 4) {
      console.log(1);
      process.exit();
    }

    for (let node of graph[n]) {
      if (!visited[node]) {
        visited[node] = visited[n] + 1;
        dfs(node);
        visited[node] = 0;
      }
    }
  }
});
