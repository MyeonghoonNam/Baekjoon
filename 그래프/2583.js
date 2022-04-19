const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 7 3
0 2 4 4
1 1 2 5
4 0 6 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [M, N, K] = input().split(" ").map(Number);
  const map = Array.from(new Array(M), () => new Array(N).fill(1));
  const visited = Array.from(new Array(M), () => new Array(N).fill(false));

  for (let i = 0; i < K; i++) {
    const [start_x, start_y, end_x, end_y] = input().split(" ").map(Number);

    // 직사각형 영역 => 0, 빈 영역 => 1;
    for (let y = start_y; y < end_y; y++) {
      for (let x = start_x; x < end_x; x++) {
        if (map[y][x] !== 0) {
          map[y][x] = 0;
        }
      }
    }
  }

  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];

  const dfs = (y, x) => {
    visited[y][x] = true;
    size_small += 1;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!checkMapRange(ny, nx)) continue;

      if (map[ny][nx] === 1 && !visited[ny][nx]) {
        dfs(ny, nx);
      }
    }
  };

  const checkMapRange = (y, x) => {
    if (x >= 0 && x < N && y >= 0 && y < M) return true;
    else return false;
  };

  let size_big = 0; // 큰 영역의 수
  let size_small = 0; // 하나의 큰 영역의 세부 사각형 수
  const result = []; // 각 영역별 사각형 수의 집합

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 1 && !visited[i][j]) {
        size_small = 0;
        dfs(i, j);
        size_big += 1;
        result.push(size_small);
      }
    }
  }

  // 영역 오름차순 정렬
  result.sort((a, b) => a - b);

  return `${size_big}\n${result.join(" ")}`;
};

console.log(solution());
