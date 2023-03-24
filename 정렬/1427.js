const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `500613009`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const number = input().split("").map(Number);
  const result = number.sort((a, b) => b - a);

  return result.join("");
};

console.log(solution());
