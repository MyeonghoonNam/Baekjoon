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

  let five_bag = 0;
  let three_bag = 0;
  let result = 0;

  while (true) {
    if (N < 0) {
      result = -1;
      break;
    }

    if (N % 5 === 0) {
      // 5kg
      five_bag = N / 5;
      result = five_bag + three_bag;
      break;
    } else {
      // 3kg
      N -= 3;
      three_bag += 1;
    }
  }

  return result;
};

console.log(solution());
