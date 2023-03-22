const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `11
10987654321`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = input().split("").map(Number);

  const result = numbers.reduce((acc, cur) => acc + cur);

  return result;
};

console.log(solution());
