const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 5
100
400
300
100
500
101
400`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * N일 동안 통장에서 M번동안 K원 인출한다.
 *
 *
 * 요구사항: M번까지 돈을 인출할 수 있을 때 매번 인출하는 금액의 최솟값 도출
 */

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const costs = [];
  let result = 0;
  let start = 0;
  let end = 0;

  for (let i = 0; i < N; i++) {
    const cost = Number(input());
    costs.push(cost);
    start = Math.max(start, cost);
    end += cost;
  }

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    let money = mid;
    let count = 1; // 인출횟수

    for (let i = 0; i < N; i++) {
      const cost = costs[i];
      money -= cost;

      if (money < 0) {
        money = mid - cost; // 남은 금액을 통장에 넣고 K원 인출하여 계산
        count += 1;
      }
    }

    if (count > M) {
      start = mid + 1;
    } else {
      result = mid;
      end = mid - 1;
    }
  }

  return result;
};

console.log(solution());
