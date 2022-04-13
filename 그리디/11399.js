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
  const times = input().split(" ").map(Number);

  times.sort((a, b) => a - b);

  let result = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j <= i; j++) {
      result += times[j];
    }
  }

  return result;
};

console.log(solution());
