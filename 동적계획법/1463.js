const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항: 조건에서 제시된 연산 3가지를 활용하여 1을 만드는 최소 횟수 도출
 *
 * 같은 연산에 대한 접근이 무수히 많이 이루어지는 구조이므로 DP를 활용
 */
const solution = () => {
  const N = Number(input());
  const DP = [0, 0];

  for (let i = 2; i <= N; i++) {
    DP[i] = DP[i - 1] + 1;

    if (i % 2 === 0) {
      DP[i] = Math.min(DP[i], DP[i / 2] + 1);
    }

    if (i % 3 === 0) {
      DP[i] = Math.min(DP[i], DP[i / 3] + 1);
    }
  }

  return DP[N];
};

console.log(solution());
