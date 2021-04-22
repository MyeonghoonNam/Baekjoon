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
  const [N, M] = input[0];
  input.shift();

  const graph = Array.from(new Array(N + 1), () => new Array());
  const visited = new Array(N + 1).fill(false);

  for (let i = 0; i < M; i++) {
    const [v1, v2] = input[i];

    insertEdge(v1, v2);
    insertEdge(v2, v1);
  }

  let count = 0;
  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      dfs(i);
      count++;
    }
  }

  console.log(count);
  process.exit();

  function insertEdge(vFront, vBack) {
    graph[vFront].push(vBack);
  }

  function dfs(v) {
    if (visited[v]) return;

    visited[v] = true;

    graph[v].forEach((vertex) => {
      if (!visited[vertex]) {
        dfs(vertex);
      }
    });
  }
});
