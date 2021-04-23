const input = [
  '3',
  '8',
  '0 0',
  '7 0',
  '100',
  '0 0',
  '30 50',
  '10',
  '1 1',
  '1 1',
];

const T = parseInt(input.shift());

let L = 0;
let visited = [];

for (let i = 0; i < T; i++) {
  L = parseInt(input.shift());
  visited = Array.from(new Array(L), () => new Array(L).fill(false));

  const start = input
    .shift()
    .split(' ')
    .map((el) => parseInt(el));

  const end = input
    .shift()
    .split(' ')
    .map((el) => parseInt(el));

  Bfs(start, end);
}

function Bfs(start, end) {
  const q = [];
  let count = 0;

  q.push([...start, count]);

  while (q.length !== 0) {
    const current = q.shift();
    const start_X = current[0];
    const start_Y = current[1];
    count = current[2];

    if (start_X === end[0] && start_Y === end[1]) {
      console.log(count);
      return;
    }

    const dx = [-2, -2, -1, 1, 2, 2, 1, -1, -2];
    const dy = [-1, 1, 2, 2, 1, -1, -2, -2, -1];

    for (let i = 0; i < 9; i++) {
      const next_X = start_X + dx[i];
      const next_Y = start_Y + dy[i];

      if (CheckRange(next_X, next_Y) && !visited[next_X][next_Y]) {
        visited[next_X][next_Y] = true;
        q.push([next_X, next_Y, count + 1]);
      }
    }
  }
}

function CheckRange(x, y) {
  if (x >= 0 && x < L && y >= 0 && y < L) {
    return true;
  } else {
    return false;
  }
}
