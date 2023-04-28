const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const DP = new Array(N + 1).fill(0);

  DP[0] = 0;
  DP[1] = 1;
  DP[2] = 2;

  for (let i = 3; i <= N; i++) {
    DP[i] = (DP[i - 1] + DP[i - 2]) % 15746;
  }

  const result = DP[N];

  return result;
};

console.log(solution());
