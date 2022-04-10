const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7755`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = input().split("").map(Number);
  const divide = Math.floor(N.length / 2);

  let prev_sum = N.slice(0, divide).reduce((cur, acc) => {
    return cur + acc;
  }, 0);

  let next_sum = N.slice(divide).reduce((cur, acc) => {
    return cur + acc;
  }, 0);

  const result = prev_sum === next_sum ? "LUCKY" : "READY";
  return result;
};

console.log(solution());
