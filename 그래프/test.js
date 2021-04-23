const input = [
  [2],
  [3, 2],
  [1, 3],
  [2, 3],
  [4, 4],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 2],
];

let K = input[0][0];
input.shift();

let graph = [];
let colors = [];
let checkBipartite = true;

let idx = 0;
while (K-- > 0) {
  const [V, E] = input[idx];

  graph = Array.from(new Array(V + 1), () => new Array());
  colors = new Array(V + 1).fill(0); // 1 : red, -1 : blue, 0 : none

  let start = idx + 1;
  let end = start + E;
  for (let i = start; i < end; i++) {
    const [v1, v2] = input[i];

    insertEdge(v1, v2);
    insertEdge(v2, v1);
  }

  for (let i = 1; i <= V; i++) {
    if (!checkBipartite) {
      break;
    }

    if (colors[i] === 0) {
      bfs(i, 1);
    }
  }

  console.log(checkBipartite ? 'YES' : 'NO');
  idx += E + 1; // 입력 idx 관리
}

function insertEdge(vFront, vBack) {
  graph[vFront].push(vBack);
}

function dfs(v, color) {
  colors[v] = color;

  graph[v].forEach((vertex) => {
    if (colors[vertex] === color) {
      checkBipartite = false;
      return;
    }

    if (colors[vertex] === 0) {
      dfs(vertex, -color);
    }
  });
}

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
