const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
6
10
13
9
8
1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const drink = [0];

  for (let i = 0; i < N; i++) {
    drink.push(Number(input()));
  }

  const DP = [];

  DP[0] = 0;
  DP[1] = drink[1];
  DP[2] = drink[1] + drink[2];

  for (let i = 3; i <= N; i++) {
    DP[i] = Math.max(
      DP[i - 1],
      DP[i - 2] + drink[i],
      DP[i - 3] + drink[i - 1] + drink[i]
    );
  }

  const result = DP[N];

  return result;
};

console.log(solution());
