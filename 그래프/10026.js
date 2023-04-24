const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const map = [];
  let answer1 = 0;
  let answer2 = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    map.push(input().split(""));
  }

  let visited = Array.from(new Array(N), () => new Array(N).fill(false));

  const dfs = (x, y, color) => {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      if (!checkMapRange(nx, ny)) continue;

      if (!visited[nx][ny] && map[nx][ny] === color) {
        dfs(nx, ny, color);
      }
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        dfs(i, j, map[i][j]);
        answer1 += 1;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === "G") {
        map[i][j] = "R";
      }
    }
  }

  visited = Array.from(new Array(N), () => new Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        dfs(i, j, map[i][j]);
        answer2 += 1;
      }
    }
  }

  const result = `${answer1} ${answer2}`;

  return result;
};

console.log(solution());
