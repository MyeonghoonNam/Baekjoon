const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
5 15 100 31 39 0 0 3 26
11 12 13 2 3 4 5 9 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const A = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const B = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

  let result = 0;

  for (let i = 0; i < N; i++) {
    result += A[i] * B[i];
  }

  return result;
};

console.log(solution());
