const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8
1.1
0.7
1.3
0.9
1.4
0.8
0.7
1.4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const DP = [];
  const numbers = [];

  for (let i = 0; i < N; i++) {
    numbers.push(Number(input()));
  }

  DP[0] = numbers[0];

  for (let i = 1; i < N; i++) {
    DP[i] = Math.max(numbers[i], numbers[i] * DP[i - 1]);
  }

  const result = Math.max(...DP).toFixed(3);

  return result;
};

console.log(solution());
