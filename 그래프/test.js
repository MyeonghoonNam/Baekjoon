const input = [
  [6, 8],
  [1, 2],
  [2, 5],
  [5, 1],
  [3, 4],
  [4, 6],
  [5, 4],
  [2, 4],
  [2, 3],
];

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
