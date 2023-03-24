const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
3 1 4 3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const times = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let result = 0;

  times.reduce((acc, cur) => {
    acc += cur;
    result += acc;

    return acc;
  }, 0);

  return result;
};

console.log(solution());
