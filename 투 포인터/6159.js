const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 6
3
5
2
1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, S] = input().split(" ").map(Number);
  const arr = [];

  for (let i = 0; i < N; i++) {
    arr.push(Number(input()));
  }

  arr.sort((a, b) => a - b);

  let start = 0;
  let end = N - 1;
  let result = 0;

  while (start < end) {
    if (arr[start] + arr[end] <= S) {
      result += end - start;
    } else {
      start--;
      end--;
    }

    start++;
  }

  return result;
};

console.log(solution());
