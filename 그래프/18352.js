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
  const [N, M, K, X] = input[0].split(' ').map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());
  for (let i = 1; i <= M; i++) {
    const [v1, v2] = input[i].split(' ').map(Number);
    graph[v1].push(v2);
  }
  const dist = new Array(N + 1).fill(Infinity);

  Bfs(X);

  function Bfs(X) {
    const q = [[X, 0]];
    dist[X] = 0;

    while (q.length > 0) {
      const [v, d] = q.shift();

      if (d > K) {
        continue;
      }

      graph[v].forEach((vertex) => {
        let nextDistance = d + 1;
        if (nextDistance < dist[vertex]) {
          q.push([vertex, nextDistance]);
          dist[vertex] = nextDistance;
        }
      });
    }

    let flag = 0;
    dist.forEach((d, idx) => {
      if (d === K) {
        flag = 1;
        console.log(idx);
      }
    });

    if (!flag) console.log(-1);
  }
});
