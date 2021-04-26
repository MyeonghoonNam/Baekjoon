const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 구현
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
        Dfs(i, j, 1);
      }
    }
  }

  console.log('No');
  process.exit();

  function Dfs(x, y, count) {
    visited[x][y] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, 1, -1];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (CheckRange(nx, ny) && !visited[nx][ny] && map[x][y] === map[nx][ny]) {
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
});
