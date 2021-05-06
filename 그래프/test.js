const input = ['6 5', '1 2', '2 5', '5 1', '3 4', '4 6'];

const [N, M] = input.shift().split(' ').map(Number);
const visited = new Array(N + 1).fill(false);
const graph = Array.from(new Array(N + 1), () => new Array());
for (let i = 0; i < M; i++) {
  const [v1, v2] = input[i].split(' ').map(Number);

  graph[v1].push(v2);
  graph[v2].push(v1);
}

let count = 0;
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    Dfs(i);
    count++;
  }
}

console.log(count);

function Dfs(v) {
  if (visited[v]) return;

  visited[v] = true;
  graph[v].forEach((vertex) => {
    if (!visited[vertex]) {
      Dfs(vertex);
    }
  });
}
