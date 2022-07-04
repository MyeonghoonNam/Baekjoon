const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
9
2 7 4 1 5 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const M = Number(input());
  const arr = input().split(" ").map(Number);
  let result = 0;

  arr.sort((a, b) => a - b);

  let start = 0;
  let end = N - 1;
  let sum = 0;

  while (start < end) {
    sum = arr[start] + arr[end];

    if (sum === M) {
      result++;
      start++;
      end--;
    } else if (sum < M) {
      start++;
    } else {
      end--;
    }
  }

  return result;
};

console.log(solution());
