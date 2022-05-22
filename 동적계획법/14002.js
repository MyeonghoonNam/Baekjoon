const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
10 20 10 30 20 50`
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
      if (numbers[i] > numbers[j] && DP[i] < DP[j] + 1) {
        DP[i] = DP[j] + 1;
      }
    }
  }

  const result = [];
  let max_length = Math.max(...DP);

  for (let i = N - 1; i >= 0; i--) {
    if (DP[i] === max_length) {
      result.push(numbers[i]);
      max_length--;
    }
  }

  return `${result.length}\n${result.reverse().join(" ")}`;
};

console.log(solution());
