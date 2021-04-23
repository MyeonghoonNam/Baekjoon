const input = [
  [7],
  [0, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0],
];

const N = input[0][0];
input.shift();

const graph = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const count = []; // 단지별 아파트 개수를 담는 배열
let home = 0; // 단지별 아파트 개수
for (let i = 0; i < N; i++) {
  graph.push(input[i]);
}

Solution();

function Solution() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === 1) {
        DFS(i, j);
        count.push(home);
        home = 0;
      }
    }
  }

  let result = '';
  result += count.length + '\n';

  count.sort((a, b) => a - b);
  result += count.join('\n');

  console.log(result);
}

function DFS(i, j) {
  if (RangeCheck(i, j) && graph[i][j] === 1) {
    graph[i][j] = 0;
    home += 1;

    for (let k = 0; k < dx.length; k++) {
      DFS(i + dx[k], j + dy[k]);
    }
  }
}

function RangeCheck(i, j) {
  if (i >= 0 && i < N && j >= 0 && j < N) {
    return true;
  } else {
    return false;
  }
}
