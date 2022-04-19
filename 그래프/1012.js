const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `1
5 3 6
0 2
1 2
2 2
3 2
4 2
4 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let T = Number(input());
  const result = [];

  while (T--) {
    const [M, N, K] = input().split(" ").map(Number);
    const map = Array.from(new Array(N), () => new Array(M).fill(0));
    const visited = Array.from(new Array(N), () => new Array(M).fill(false));
    let count = 0;

    for (let i = 0; i < K; i++) {
      const [x, y] = input().split(" ").map(Number);
      map[y][x] = 1;
    }

    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];

    const dfs = (y, x) => {
      visited[y][x] = true;

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
      if (x >= 0 && x < M && y >= 0 && y < N) return true;
      else return false;
    };

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (!visited[i][j] && map[i][j] === 1) {
          dfs(i, j);
          count += 1;
        }
      }
    }

    result.push(count);
  }

  return result.join("\n");
};

console.log(solution());
