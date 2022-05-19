const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
4
7
10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());
  while (T--) {
    const N = Number(input());
    const DP = [0, 1, 2, 4]; // DP[i] = 조건으로 i를 만드는 경우의 수

    for (let i = 4; i <= N; i++) {
      DP[i] = DP[i - 1] + DP[i - 2] + DP[i - 3];
    }

    result.push(DP[N]);
  }

  return result.join("\n");
};

console.log(solution());
