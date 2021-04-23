// const input = ['4 6', '101111', '101010', '101011', '111011'];
// const input = ['3 5', '10000', '10100', '11111'];
// const input = ['4 6', '110110', '110110', '111111', '111101'];
// const input = [
//   '2 25',
//   '1011101110111011101110111',
//   '1110111011101110111011101',
// ];
const input = [
  '7 7',
  '1011111',
  '1110001',
  '1000001',
  '1000001',
  '1000001',
  '1000001',
  '1111111',
];

const [N, M] = input[0].split(' ').map((el) => parseInt(el));
input.shift();

const maze = new Array(N);

for (let i = 0; i < N; i++) {
  maze[i] = input[i].split('').map((el) => parseInt(el));
}

console.log(BFS(N, M));

function BFS(N, M) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const q = [[0, 0]];
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));

  while (q.length !== 0) {
    const current = q.shift();

    const x = current[0];
    const y = current[1];

    for (let i = 0; i < dx.length; i++) {
      const next_X = x + dx[i];
      const next_Y = y + dy[i];

      if (next_X >= 0 && next_X < N && next_Y >= 0 && next_Y < M) {
        if (maze[next_X][next_Y] === 1 && !visited[next_X][next_Y]) {
          visited[next_X][next_Y] = true;
          maze[next_X][next_Y] = maze[x][y] + 1;

          q.push([next_X, next_Y]);
        }
      }
    }
  }

  return maze[N - 1][M - 1];
}
