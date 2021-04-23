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
  let K = input[0][0];

  let graph = [];
  let colors = [];
  let checkBipartite = true;

  let idx = 1;
  while (K-- > 0) {
    const [V, E] = input[idx];

    graph = Array.from(new Array(V + 1), () => new Array());
    colors = new Array(V + 1).fill(0);

    const start = idx + 1;
    const end = start + E;
    for (let i = start; i < end; i++) {
      const [v1, v2] = input[i];

      insertEdge(v1, v2);
      insertEdge(v2, v1);
    }

    for (let i = 1; i <= V; i++) {
      if (!checkBipartite) break;

      if (colors[i] === 0) {
        bfs(i, 1); // 초기설정 RED
      }
    }

    console.log(checkBipartite ? 'YES' : 'NO');

    idx += E + 1; // 입력값 인덱스 관리
  }

  process.exit();

  function insertEdge(vFront, vBack) {
    graph[vFront].push(vBack);
  }

  // function dfs(v, color) {
  //   colors[v] = color;

  //   graph[v].forEach((vertex) => {
  //     if (colors[vertex] === color) {
  //       checkBipartite = false;
  //       return;
  //     }

  //     if (colors[vertex] === 0) {
  //       dfs(vertex, -color);
  //     }
  //   });
  // }
  function bfs(v, color) {
    const q = [];

    q.push(v);
    colors[v] = color;

    while (q.length !== 0 && checkBipartite) {
      const v = q.shift();

      graph[v].forEach((vertex) => {
        if (colors[vertex] === 0) {
          q.push(vertex);
          colors[vertex] = -colors[v];
        } else if (colors[v] === colors[vertex]) {
          checkBipartite = false;
          return;
        }
      });
    }
  }
});
