const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
-100 -2 -1 103`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const arr = input().split(" ").map(Number);
  let result = Number.MAX_SAFE_INTEGER;

  let left = 0; // 용액 1
  let right = 0; // 용액 2
  let start = 0;
  let end = N - 1;
  while (start < end) {
    const sum = arr[start] + arr[end];

    if (Math.abs(result) > Math.abs(sum)) {
      result = sum;
      left = arr[start];
      right = arr[end];
    }

    if (sum === 0) break;
    else if (sum > 0) end--;
    else start++;
  }

  return `${left} ${right}`;
};

console.log(solution());
