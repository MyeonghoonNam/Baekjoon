const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `11 10
7 4 0
1 1 1 1 1 1 1 1 1 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 1 1 1 1 0 1
1 0 0 1 1 0 0 0 0 1
1 0 1 1 0 0 0 0 0 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 0 0 0 1
1 1 1 1 1 1 1 1 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const [r, c, d] = input().split(" ").map(Number);
  const map = [];
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));
  let result = 0;

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    map.push(row);
  }

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const dfs = (x, y, direction, clean_count) => {
    for (let i = 0; i < 4; i++) {
      const nd = (direction + 3 - i) % 4;
      const nx = x + dx[nd];
      const ny = y + dy[nd];

      if (!checkMapRange(nx, ny) || map[nx][ny] === 1) continue;
      if (!visited[nx][ny] && map[nx][ny] === 0) {
        visited[nx][ny] = true;
        dfs(nx, ny, nd, clean_count + 1);
      }
    }

    const back_position_index =
      direction + 2 < 4 ? direction + 2 : direction - 2;
    const back_x = x + dx[back_position_index];
    const back_y = y + dy[back_position_index];

    if (checkMapRange(back_x, back_y)) {
      if (map[back_x][back_y] === 0) {
        dfs(back_x, back_y, direction, clean_count);
      } else {
        console.log(clean_count);
        process.exit(0);
      }
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < M) return true;
    else return false;
  };

  visited[r][c] = true;
  dfs(r, c, d, 1);
};

solution();
