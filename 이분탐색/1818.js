const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
2 1 4 5 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const LIS = [];
  const books = input().split(" ").map(Number);
  let result = 0;

  const lowerBound = (start, end, target) => {
    while (start < end) {
      const mid = parseInt((start + end) / 2);

      if (LIS[mid] >= target) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }

    return end;
  };

  LIS[0] = books[0];

  for (let i = 1, j = 0; i < N; i++) {
    if (LIS[j] < books[i]) {
      j += 1;
      LIS[j] = books[i];
    } else {
      let position = lowerBound(0, j, books[i]);

      LIS[position] = books[i];
      result += 1;
    }
  }

  return result;
};

console.log(solution());
