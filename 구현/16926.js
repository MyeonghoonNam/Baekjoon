const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2 2 3
1 1
1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M, R] = input().split(" ").map(Number);
  const map = [];
  const result = [];

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    map.push(row);
  }

  const rotate = () => {
    const rotateSquareCount = Math.floor(Math.min(N, M) / 2);

    for (let cnt = 0; cnt < rotateSquareCount; cnt++) {
      const yMax = N - cnt - 1;
      const xMax = M - cnt - 1;

      const startPositionValue = map[cnt][cnt];

      for (let i = cnt; i < xMax; i++) {
        map[cnt][i] = map[cnt][i + 1];
      }

      for (let i = cnt; i < yMax; i++) {
        map[i][xMax] = map[i + 1][xMax];
      }

      for (let i = xMax; i > cnt; i--) {
        map[yMax][i] = map[yMax][i - 1];
      }

      for (let i = yMax; i > cnt; i--) {
        map[i][cnt] = map[i - 1][cnt];
      }

      map[cnt + 1][cnt] = startPositionValue;
    }
  };

  for (let i = 0; i < R; i++) {
    rotate();
  }

  for (let i = 0; i < N; i++) {
    const row = map[i].join(" ");
    result.push(row);
  }

  return result.join("\n");
};

console.log(solution());
