const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `13`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let N = Number(input());
  let result = 0;

  if (N === 1 || N === 3) return -1;

  while (N > 0) {
    if (N % 2 === 1 || N % 5 === 0) {
      N -= 5;
    } else if (N % 2 === 0) {
      N -= 2;
    }

    result += 1;
  }

  return result;
};

console.log(solution());
