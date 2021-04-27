// const input = ['4', '1 2', '1 3', '2 4', '1 2 4 3'];
// const input = ['4', '1 2', '1 3', '2 4', '1 3 2 4'];
const input = ['4', '1 2', '1 3', '2 4', '1 2 3 4'];

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
Dfs(1);
console.log(CheckOrder(answer, dfsOrder));

function Dfs(v) {
  if (visited[v]) return;

  visited[v] = true;
  dfsOrder.push(v);

  graph[v].forEach((vertex) => {
    if (!visited[vertex]) {
      Dfs(vertex);
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
