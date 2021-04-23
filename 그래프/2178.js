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
  // 그래프의 최단거리와 같은 문제는 BFS로 해결한다.
  const [N, M] = input[0].split(' ').map((el) => parseInt(el));
  input.shift();

  const maze = new Array(N);

  for (let i = 0; i < N; i++) {
    maze[i] = input[i].split('').map((el) => parseInt(el));
  }

  console.log(BFS(N, M));
  process.exit();

  function BFS(N, M) {
    const q = [[0, 0]];
    const visited = Array.from(new Array(N), () => new Array(M).fill(false));

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (q.length !== 0) {
      const current = q.shift();
      const x = current[0];
      const y = current[1];

      for (i = 0; i < 4; i++) {
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
});
