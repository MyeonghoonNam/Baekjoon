const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 5
3 -2 -4 -9 0 3 7 13 8 -3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const temperature = input().split(" ").map(Number);
  let result = Number.MIN_SAFE_INTEGER;
  let sum = 0;

  for (let i = 0; i < K; i++) {
    sum += temperature[i];
  }

  result = sum;

  for (let i = K; i < N; i++) {
    sum += temperature[i] - temperature[i - K];
    result = Math.max(result, sum);
  }

  return result;
};

console.log(solution());
