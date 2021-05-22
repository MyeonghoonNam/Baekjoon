const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `12
1 2
1 3
2 4
3 5
3 6
4 7
4 8
5 9
5 10
6 11
6 12`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const graph = Array.from(new Array(N + 1), () => new Array());
  const visited = new Array(N + 1).fill(false);
  const parentArr = [];

  for (let i = 1; i < N; i++) {
    const [v1, v2] = input().split(' ').map(Number);

    graph[v1].push(v2);
    graph[v2].push(v1);
  }

  const bfs = (start) => {
    const q = [start];
    visited[start] = true;

    while (q.length > 0) {
      const cur = q.shift();

      for (let i = 0; i < graph[cur].length; i++) {
        const next = graph[cur][i];

        if (!visited[next]) {
          visited[next] = true;
          parentArr[next] = cur;
          q.push(next);
        }
      }
    }
  };

  bfs(1);

  let result = '';
  parentArr.forEach((parent) => {
    result += parent + '\n';
  });

  return result;
}
