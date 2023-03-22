const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 3 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [A, B, C] = input().split(" ").map(Number);

  if (A === B && B === C) {
    return 10000 + A * 1000;
  } else if (A === B) {
    return 1000 + A * 100;
  } else if (A === C) {
    return 1000 + A * 100;
  } else if (B === C) {
    return 1000 + B * 100;
  } else {
    return Math.max(A, B, C) * 100;
  }
};

console.log(solution());
