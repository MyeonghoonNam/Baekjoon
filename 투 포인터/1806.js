const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `1 2
2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, S] = input().split(" ").map(Number);
  const arr = input().split(" ").map(Number);

  let result = Infinity;
  let start = 0;
  let end = 0;
  let sum = 0;

  while (start <= end && end <= N) {
    if (sum >= S) {
      result = Math.min(result, end - start);
      sum -= arr[start];
      start += 1;
    } else {
      sum += arr[end];
      end += 1;
    }
  }

  return result !== Infinity ? result : 0;
};

console.log(solution());
