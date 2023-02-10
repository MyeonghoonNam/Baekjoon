const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
6 3 2 10 10 10 -10 -10 7 3
8
10 9 -5 2 3 4 5 -10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  const M = Number(input());
  const findNumbers = input().split(" ").map(Number);

  const result = [];

  const lowerBound = (findNumber) => {
    let low = 0;
    let high = N;

    while (low <= high) {
      const mid = parseInt((low + high) / 2);

      if (numbers[mid] < findNumber) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return low;
  };

  const upperBound = (findNumber) => {
    let low = 0;
    let high = N;

    while (low <= high) {
      const mid = parseInt((low + high) / 2);

      if (numbers[mid] <= findNumber) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return low;
  };

  for (let i = 0; i < M; i++) {
    const findNumber = findNumbers[i];
    const firstIndex = lowerBound(findNumber);
    const lastIndex = upperBound(findNumber);

    result.push(lastIndex - firstIndex);
  }

  return result.join(" ");
};

console.log(solution());
