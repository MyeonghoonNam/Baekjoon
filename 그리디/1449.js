const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 2
1 2 100 101`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, L] = input().split(" ").map(Number);
  const position = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  let result = 0;

  let startPosition = position[0];
  for (let i = 1; i < N; i++) {
    if (L <= position[i] - startPosition) {
      result++;
      startPosition = position[i];
    }
  }

  result++;
  return result;
};

console.log(solution());
