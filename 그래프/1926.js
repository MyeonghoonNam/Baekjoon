const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 5
1 1 0 1 1
0 1 1 0 0
0 0 0 0 0
1 0 1 1 1
0 0 1 1 1
0 0 1 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const map = [];
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));
  let pictureCount = 0;
  let pictureArea = 0;
  let pictureMaxArea = 0;

  for (let i = 0; i < N; i++) {
    map.push(input().split(" ").map(Number));
  }

  const dfs = (x, y) => {
    visited[x][y] = true;
    pictureArea++;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (checkRangeMap(nx, ny) === false) continue;

      if (visited[nx][ny] === false && map[nx][ny] === 1) {
        dfs(nx, ny);
      }
    }
  };

  const checkRangeMap = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1 && visited[i][j] === false) {
        dfs(i, j);
        pictureCount++;

        if (pictureMaxArea < pictureArea) {
          pictureMaxArea = pictureArea;
        }

        pictureArea = 0;
      }
    }
  }

  const result = `${pictureCount}\n${pictureMaxArea}`;

  return result;
};

console.log(solution());
