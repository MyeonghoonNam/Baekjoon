const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 10
1
2
5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항: n가지 종류의 동전을 사용하여 가치의 합이 k원이 되는 경우의 수 도출
 *
 * dp 활용 dp[i]의 값은 가치의 합이 i원인 경우의 수
 */

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const coin = [];

  for (let i = 0; i < N; i++) {
    const value = Number(input());
    coin.push(value);
  }

  const DP = new Array(K + 1).fill(0);
  DP[0] = 1;

  // N개의 동전
  for (let i = 0; i < N; i++) {
    // 특정 가치의 동전으로 만들 수 있는 총 합
    for (let j = coin[i]; j <= K; j++) {
      DP[j] += DP[j - coin[i]];
    }
  }

  const result = DP[K];
  return result;
};

console.log(solution());
