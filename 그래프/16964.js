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
  process.exit();

  function Solution(input) {
    const N = parseInt(input.shift());

    const graph = Array.from(new Array(N + 1), () => new Array());
    const visited = new Array(N + 1).fill(false);

    for (let i = 0; i < N - 1; i++) {
      const [v1, v2] = input
        .shift()
        .split(' ')
        .map((el) => parseInt(el));

      graph[v1].push(v2);
      graph[v2].push(v1);
    }

    const answer = input
      .shift()
      .split(' ')
      .map((el) => parseInt(el));

    const order = [];
    for (let i = 0; i < answer.length; i++) {
      order[answer[i]] = i + 1;
    }

    for (let i = 1; i <= N; i++) {
      graph[i].sort((a, b) => order[a] - order[b]);
    }

    const dfsOrder = [];
    Dfs(graph, visited, dfsOrder, 1);

    return CheckOrder(answer, dfsOrder);
  }

  function Dfs(graph, visited, dfsOrder, vertex) {
    if (visited[vertex]) return;

    visited[vertex] = true;

    dfsOrder.push(vertex);

    graph[vertex].forEach((v) => {
      if (!visited[v]) {
        Dfs(graph, visited, dfsOrder, v);
      }
    });
  }

  function CheckOrder(answer, dfsOrder) {
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === dfsOrder[i]) continue;

      return 0;
    }

    return 1;
  }
});
