const [n, m] = [5, 4];
const input = ['0 1', '1 2', '2 3', '3 4'];

const graph = Array.from(Array(n), () => Array());
let visited = Array(n).fill(0);

for (let i = 0; i < m; i++) {
  const [a, b] = input[i].split(' ').map((el) => parseInt(el));

  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 0; i < n; i++) {
  visited[i] = 1;
  dfs(i);
  visited[i] = 0;
}

console.log(0);

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
