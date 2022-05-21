const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
10
20
15
25
10
20`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항 : 주어진 조건을 활용하여 계단을 밟을 때 도출할 수 있는 최댓값 도출
 *
 * ex) 10 20 15 25 10 20의 계단 정보(stairs)
 * DP[0] = 0;
 * DP[1] = 10;
 * DP[2] = 10 + 20 = 30;
 * DP[3] = max(DP[1], DP[0] + stairs[2]) + stairs[3];
 * DP[i] = max(DP[i - 2], DP[i - 3] + stairs[i - 1]) + stairs[i];
 */
const solution = () => {
  const N = Number(input());
  const stairs = [0];
  const DP = [0];

  for (let i = 0; i < N; i++) {
    stairs.push(Number(input()));
  }

  DP[1] = stairs[1];
  DP[2] = stairs[1] + stairs[2];

  for (let i = 3; i <= N; i++) {
    DP[i] = Math.max(DP[i - 2], DP[i - 3] + stairs[i - 1]) + stairs[i];
  }

  return DP[N];
};

console.log(solution());
