const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `1000000 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [N, K] = input().split(" ").map(Number);
  let result = 0;

  if (K >= N) return 0;

  while (true) {
    let count = 0;
    let temp = N;

    while (temp > 0) {
      if (temp % 2 === 1) {
        count += 1;
      }

      temp = Math.floor(temp / 2);
    }

    if (K >= count) {
      break;
    }

    N += 1;
    result += 1;
  }

  return result;
};

console.log(solution());
