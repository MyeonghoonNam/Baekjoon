const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 2
1 4 2 5 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, X] = input().split(" ").map(Number);
  const data = input().split(" ").map(Number);
  const arr = new Array(250000);
  let sum = 0;

  for (let i = 0; i < N; i++) {
    const day = data[i];
    arr[i + 1] = day;
    sum += arr[i + 1];
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
