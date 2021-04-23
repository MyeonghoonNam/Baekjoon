function Solution(map) {
  const [W, H] = map;

  let count = 0;

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (graph[i][j] === 1) {
        DFS(i, j, map);
        count++;
      }
    }
  }

  console.log(count);
}

function DFS(i, j, map) {
  const dx = [-1, 1, 0, 0, -1, -1, 1, 1];
  const dy = [0, 0, -1, 1, -1, 1, -1, 1];

  if (CheckRange(i, j, map) && graph[i][j] === 1) {
    graph[i][j] = 0;

    for (let k = 0; k < dx.length; k++) {
      DFS(i + dx[k], j + dy[k], map);
    }
  }
}

function CheckRange(i, j, map) {
  const [W, H] = map;

  if (i >= 0 && i < H && j >= 0 && j < W) {
    return true;
  } else {
    return false;
  }
}

const input = [
  '1 1',
  '0',
  '2 2',
  '0 1',
  '1 0',
  '3 2',
  '1 1 1',
  '1 1 1',
  '5 4',
  '1 0 1 0 0',
  '1 0 0 0 0',
  '1 0 1 0 1',
  '1 0 0 1 0',
  '5 4',
  '1 1 1 0 1',
  '1 0 1 0 1',
  '1 0 1 0 1',
  '1 0 1 1 1',
  '5 5',
  '1 0 1 0 1',
  '0 0 0 0 0',
  '1 0 1 0 1',
  '0 0 0 0 0',
  '1 0 1 0 1',
];

let graph = [];

while (input.length !== 0) {
  const [W, H] = input[0].split(' ').map((el) => parseInt(el));
  input.shift();

  for (let i = 0; i < H; i++) {
    graph[i] = input[0].split(' ').map((el) => parseInt(el));
    input.shift();
  }

  const map = [W, H];
  Solution(map);

  graph = [];
}
