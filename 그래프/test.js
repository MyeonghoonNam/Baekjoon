// const input = ['4', '1 3', '4 3', '4 2', '1 2'];
// const input = ['6', '1 2', '3 4', '6 4', '2 3', '1 3', '3 5'];
const input = [
  '12',
  '1 3',
  '3 4',
  '4 5',
  '5 6',
  '6 7',
  '7 8',
  '8 4',
  '2 3',
  '7 9',
  '9 12',
  '7 10',
  '10 11',
];

const N = parseInt(input.shift());
const graph = Array.from(new Array(N + 1), () => new Array());
let visited = new Array(N + 1).fill(false);
const cycle = new Array(N + 1).fill(false);
const result = [];

for (let i = 0; i < N; i++) {
  const [x, y] = input
    .shift()
    .split(' ')
    .map((el) => parseInt(el));

  insertEdge(x, y);
  insertEdge(y, x);
}

for (let i = 1; i <= N; i++) {
  Dfs(i, i, 0);
  visited = new Array(N + 1).fill(false);
}

for (let i = 1; i <= N; i++) {
  if (cycle[i]) {
    result.push(0);
  } else {
    Bfs(i, 0);
    visited = new Array(N + 1).fill(false);
  }
}

console.log(result.join(' '));

function insertEdge(x, y) {
  graph[x].push(y);
}

function Dfs(currentVertex, startVertex, edgeCount) {
  visited[currentVertex] = true;

  graph[currentVertex].forEach((v) => {
    if (!visited[v]) {
      Dfs(v, startVertex, edgeCount + 1);
    } else if (v === startVertex && edgeCount >= 2) {
      cycle[v] = true;
      return;
    }
  });
}

function Bfs(startVertex, dist) {
  const queue = [];
  queue.push([startVertex, dist]);

  while (queue.length > 0) {
    const [currentVertex, dist] = queue.shift();
    visited[currentVertex] = true;

    if (cycle[currentVertex]) {
      result.push(dist);
      return;
    }

    graph[currentVertex].forEach((v) => {
      if (!visited[v]) {
        queue.push([v, dist + 1]);
      }
    });
  }
}
