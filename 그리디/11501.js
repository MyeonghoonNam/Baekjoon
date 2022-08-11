const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
3
10 7 6
3
3 5 9
5
1 1 3 1 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());
  while (T--) {
    const N = Number(input());
    const stock = input().split(" ").map(Number);
    let profit = 0;
    let maxStock = 0;

    for (let i = N - 1; i >= 0; i--) {
      if (stock[i] < maxStock) {
        profit += maxStock - stock[i];
      } else {
        maxStock = stock[i];
      }
    }

    result.push(profit);
  }

  return result.join("\n");
};

console.log(solution());
