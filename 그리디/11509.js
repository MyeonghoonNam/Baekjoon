const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
1 2 3 4 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const balloons = input().split(" ").map(Number);
  const arrowPosition = new Array(N + 1).fill(0);
  let result = 0;

  for (let i = 0; i < N; i++) {
    const height = balloons[i];

    if (arrowPosition[height] > 0) {
      arrowPosition[height] -= 1;
      arrowPosition[height - 1] += 1;
    } else {
      arrowPosition[height - 1] += 1;
      result += 1;
    }
  }

  return result;
};

console.log(solution());
