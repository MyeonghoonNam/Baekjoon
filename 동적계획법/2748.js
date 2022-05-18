const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const DP = [];

  DP[0] = BigInt(0);
  DP[1] = BigInt(1);

  for (let i = 2; i <= N; i++) {
    DP[i] = BigInt(DP[i - 1] + DP[i - 2]);
  }

  return DP[N].toString();
};

console.log(solution());
