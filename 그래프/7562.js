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
  const T = parseInt(input.shift());

  let L = 0;
  let start = [];
  let end = [];
  let visited = [];

  for (let i = 0; i < T; i++) {
    L = parseInt(input.shift());
    visited = Array.from(new Array(L), () => new Array(L).fill(false));

    start = input
      .shift()
      .split(' ')
      .map((el) => parseInt(el));
    end = input
      .shift()
      .split(' ')
      .map((el) => parseInt(el));

    Bfs([...start, 0]); // 0은 카운터 표시를 위함
  }

  process.exit();

  function Bfs(location) {
    const q = [];
    q.push(location);

    let count = 0;
    while (q.length !== 0) {
      const current = q.shift();

      const x = current[0];
      const y = current[1];
      count = current[2];

      if (x === end[0] && y === end[1]) {
        console.log(count);
        return;
      }

      const dx = [-1, -2, -2, -1, 1, 2, 2, 1];
      const dy = [-2, -1, 1, 2, 2, 1, -1, -2];

      for (let i = 0; i < 9; i++) {
        const next_X = x + dx[i];
        const next_Y = y + dy[i];

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
});
