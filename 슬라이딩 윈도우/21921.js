const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
0 0 0 0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, X] = input().split(" ").map(Number);
  const arr = input().split(" ").map(Number);
  let sum = 0;

  for (let i = 0; i < X; i++) {
    sum += arr[i];
  }

  let result = sum;
  let count = 1;

  for (let i = X; i < N; i++) {
    sum += arr[i] - arr[i - X];

    if (sum >= result) {
      if (sum === result) {
        count++;
      } else {
        result = sum;
        count = 1;
      }
    }
  }

  if (result === 0) {
    return "SAD";
  } else {
    return `${result}\n${count}`;
  }
};

console.log(solution());
