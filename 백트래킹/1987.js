const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 5
IEFCJ
FHFKC
FFALF
HFGCF
HMCHH`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [R, C] = input().split(" ").map(Number);
  const map = [];

  for (let i = 0; i < R; i++) {
    map.push(input().split(""));
  }

  const visited = new Set();
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  let result = 0;

  const dfs = (count, x, y) => {
    result = Math.max(result, count);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!isPossibleMapRange(nx, ny)) continue;
      if (visited.has(map[nx][ny])) continue;

      visited.add(map[nx][ny]);
      dfs(count + 1, nx, ny);
      visited.delete(map[nx][ny]);
    }
  };

  const isPossibleMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < R && y < C) return true;
    else return false;
  };

  visited.add(map[0][0]);
  dfs(1, 0, 0);

  return result;
};

console.log(solution());
