const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 1 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const numbers = input().split(" ").map(Number);
  const result = numbers.sort((a, b) => a - b).join(" ");

  return result;
};

console.log(solution());
