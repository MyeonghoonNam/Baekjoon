const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `1 50
1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const booksPosition = [0, ...input().split(" ").map(Number)].sort(
    (a, b) => a - b
  );

  let result = 0;
  let pivotIndex = 0;
  for (let i = 0; i <= N; i++) {
    if (booksPosition[i] === 0) {
      pivotIndex = i;
      break;
    }
  }

  for (let i = 0; i < pivotIndex; i += M) {
    result += Math.abs(booksPosition[i] * 2);
  }

  for (let i = N; i > pivotIndex; i -= M) {
    result += booksPosition[i] * 2;
  }

  result -= Math.max(Math.abs(booksPosition[0]), Math.abs(booksPosition[N]));

  return result;
};

console.log(solution());
