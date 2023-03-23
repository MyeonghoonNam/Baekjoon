const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `1
0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const video = [];
  let result = "";

  for (let i = 0; i < N; i++) {
    video.push(input());
  }

  const divideConquer = (x, y, n) => {
    for (let i = x; i < x + n; i++) {
      for (let j = y; j < y + n; j++) {
        if (video[x][y] !== video[i][j]) {
          result += "(";
          divideConquer(x, y, n / 2);
          divideConquer(x, y + n / 2, n / 2);
          divideConquer(x + n / 2, y, n / 2);
          divideConquer(x + n / 2, y + n / 2, n / 2);
          result += ")";

          return;
        }
      }
    }

    result += video[x][y] === "1" ? 1 : 0;
  };

  divideConquer(0, 0, N);

  return result;
};

console.log(solution());
