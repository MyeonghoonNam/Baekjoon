const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
2
4
7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const M = Number(input());
  const DP = [];

  DP[0] = 0;
  DP[1] = 1;
  DP[2] = 2;

  for (let i = 3; i <= N; i++) {
    DP[i] = DP[i - 1] + DP[i - 2];
  }

  const fixedSeat = [];

  for (let i = 0; i < M; i++) {
    fixedSeat.push(Number(input()));
  }

  const cases = [];
  let start = 0;

  for (let i = 0; i < M; i++) {
    const end = fixedSeat[i];

    cases.push(end - 1 - start);
    start = end;
  }

  cases.push(N - start);

  let result = 1;

  for (let i = 0; i < cases.length; i++) {
    const count = cases[i];
    result *= DP[count];
  }

  return result;
};

console.log(solution());
