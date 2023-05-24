const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
6
12`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const DP = new Array(101);
  const result = [];

  DP[0] = 0;
  DP[1] = 1;
  DP[2] = 1;

  for (let i = 3; i < 101; i++) {
    DP[i] = DP[i - 2] + DP[i - 3];
  }

  let T = Number(input());
  while (T--) {
    const N = Number(input());

    result.push(DP[N]);
  }

  return result.join("\n");
};

console.log(solution());
