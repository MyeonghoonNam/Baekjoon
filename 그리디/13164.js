const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 2
2 5 6 7 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const height = input().split(" ").map(Number);
  const diff = [];

  for (let i = 0; i < N - 1; i++) {
    diff.push(height[i + 1] - height[i]);
  }

  diff.sort((a, b) => a - b);

  let result = 0;
  for (let i = 0; i < N - K; i++) {
    result += diff[i];
  }

  return result;
};

console.log(solution());
