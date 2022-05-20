const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
1 100 2 50 60 3 5 6 7 8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const DP = [];
  let result = 0;

  for (let i = 0; i < N; i++) {
    DP[i] = numbers[i];

    for (let j = 0; j < i; j++) {
      if (numbers[i] > numbers[j] && DP[i] < DP[j] + numbers[i]) {
        DP[i] = DP[j] + numbers[i];
      }
    }

    result = result < DP[i] ? DP[i] : result;
  }

  return result;
};

console.log(solution());
