const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `11`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let N = Number(input());
  let result = 0;
  let fiveBag = 0;
  let threeBag = 0;

  while (true) {
    if (N < 0) {
      return -1;
    }

    if (N % 5 === 0) {
      fiveBag += N / 5;
      result += fiveBag + threeBag;
      return result;
    }

    N -= 3;
    threeBag += 1;
  }
};

console.log(solution());
