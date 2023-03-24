const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `100 40021`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [A, B] = input().split(" ").map(Number);
  let result = 1;

  while (true) {
    if (A > B) return -1;

    if (A === B) return result;

    if (B % 2 === 0) {
      B /= 2;
    } else if (B % 10 === 1) {
      B = parseInt(B / 10);
    } else {
      return -1;
    }

    result++;
  }
};

console.log(solution());
