const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `123402`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = input().split("").map(Number);
  const middle_index = N.length / 2;
  const left_sum = N.slice(0, middle_index).reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  const right_sum = N.slice(middle_index).reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  const result = left_sum === right_sum ? "LUCKY" : "READY";
  return result;
};

console.log(solution());
