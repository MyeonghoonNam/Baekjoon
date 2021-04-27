const input = ['4', '1 3', '2 4', '2 1', '1 3 2 4'];

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

// 출력 순서 기록
const order = [];
for (let i = 0; i < answer.length; i++) {
  order[answer[i]] = i + 1;
}

// 출력 순서로 인접리스트 정렬
for (let i = 1; i < N + 1; i++) {
  graph[i].sort((a, b) => order[a] - order[b]);
}

const bfsOrder = Bfs();
console.log(CheckOrder(answer, bfsOrder));

function Bfs() {
  const queue = [1];
  const bfsOrder = [1];

  visited[1] = true;

  while (queue.length > 0) {
    const current = queue.shift();

    graph[current].forEach((v) => {
      if (visited[v]) return;

      visited[v] = true;
      bfsOrder.push(v);
      queue.push(v);
    });
  }

  return bfsOrder;
}

function CheckOrder(answer, bfsOrder) {
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === bfsOrder[i]) continue;

    return 0;
  }

  return 1;
}
