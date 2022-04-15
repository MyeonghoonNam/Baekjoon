const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
40 30 40 20`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const level = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

  let result = 0;
  for (let i = 1; i < N; i++) {
    result += level[0] + level[i];
  }

  return result;
};

console.log(solution());
