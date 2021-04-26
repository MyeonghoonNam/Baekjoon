// const input = ['3 4', 'AAAA', 'ABCA', 'AAAA'];
// const input = ['3 4', 'AAAA', 'ABCA', 'AADA'];
const input = ['4 4', 'YYYR', 'BYBY', 'BBBY', 'BBBY'];
// const input = [
//   '7 6',
//   'AAAAAB',
//   'ABBBAB',
//   'ABAAAB',
//   'ABABBB',
//   'ABAAAB',
//   'ABBBAB',
//   'AAAAAB',
// ];
// const input = ['2 13', 'ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'];

const [N, M] = input
  .shift()
  .split(' ')
  .map((el) => parseInt(el));

const map = new Array(N);
const visited = Array.from(new Array(N), () => new Array(M).fill(false));

for (let i = 0; i < N; i++) {
  map[i] = input.shift().split('');
}

let start_X = 0;
let start_Y = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j]) {
      start_X = i;
      start_Y = j;

      visited[i][j] = true;
      Dfs(i, j, 1);
    }
  }
}

console.log('No');

function Dfs(x, y, count) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (CheckRange(nx, ny) && !visited[nx][ny] && map[x][y] === map[nx][ny]) {
      visited[x][y] = true;
      Dfs(nx, ny, count + 1);
    } else if (
      CheckRange(nx, ny) &&
      start_X === nx &&
      start_Y === ny &&
      count >= 4
    ) {
      console.log('Yes');
      process.exit();
    }
  }

  visited[x][y] = false;
}

function CheckRange(x, y) {
  if (x >= 0 && x < N && y >= 0 && y < M) {
    return true;
  } else {
    return false;
  }
}
