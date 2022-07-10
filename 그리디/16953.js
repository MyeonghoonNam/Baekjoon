const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2 162`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [A, B] = input().split(" ").map(Number);
  let result = 0;

  while (true) {
    if (A > B) return -1;

    if (A === B) {
      result++;
      break;
    }

    if (B % 10 === 1) {
      B--;
      B /= 10;
    } else if (B % 2 === 0) {
      B /= 2;
    } else {
      result = -1;
      break;
    }

    result++;
  }

  return result;
};

console.log(solution());
