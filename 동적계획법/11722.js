const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
10 30 10 20 20 10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const DP = [];

  for (let i = 0; i < N; i++) {
    DP[i] = 1;

    for (let j = 0; j < i; j++) {
      if (numbers[i] < numbers[j] && DP[i] < DP[j] + 1) {
        DP[i] = DP[j] + 1;
      }
    }
  }

  return Math.max(...DP);
};

console.log(solution());
