const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
120 110 140 150
485`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구샇항: 여러 지방의 예산요청과 국가예산의 총액을 토대로 아래 조건에 맞추어 가능한 최대의 총 예산 구하기
 *
 * 1. 모든 요청이 배정될 수 있는 경우에는 요청한 금액을 그대로 배정한다.
 * 2. 모든 요청이 배정될 수 없는 경우에는 특정한 정수 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정한다. 상한액 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정한다.
 *
 * 1. 입력값이 크며 결정 유형의 문제이므로 크기가 큰 배열의 탐색에 효율적인 이분탐색을 활용한다.
 * 2. 총액 이하에서 가능한 한 최대의 총 예산을 구하기 위해 입력 받는 예산 요청 중 최대금액을 구하고 최소금액은 0으로 정한다.
 * 3. 이분탐색을 진행할 때 min(i번째 예산 요청, 상한)을 모두 더한 값이 국가예산(M) 이하이면 상한을 갱싢하며 최댓값을 도출한다.
 */

// 3차 풀이
const solution = () => {
  let result = 0;
  const N = Number(input());
  const budget = input().split(" ").map(Number);
  const M = Number(input());
  const maxBudget = Math.max(...budget);

  const totalBudget = budget.reduce((acc, cur) => acc + cur, 0);

  if (totalBudget <= M) {
    return maxBudget;
  }

  let start = 0;
  let end = maxBudget;

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    let totalBudget = 0;

    for (let i = 0; i < N; i++) {
      totalBudget += Math.min(mid, budget[i]);
    }

    if (totalBudget <= M) {
      start = mid + 1;
      result = mid;
    } else {
      end = mid - 1;
    }
  }

  return result;
};

// 2차 풀이
// const solution = () => {
//   const N = Number(input());
//   const request = input().split(" ").map(Number);
//   const M = Number(input());
//   let result = 0;

//   let start = 1;
//   let end = request.reduce((a, b) => Math.max(a, b));

//   while (start <= end) {
//     let mid = parseInt((start + end) / 2);
//     let total = 0;

//     for (let i = 0; i < N; i++) {
//       total += Math.min(mid, request[i]);
//     }

//     if (total <= M) {
//       result = mid;
//       start = mid + 1;
//     } else {
//       end = mid - 1;
//     }
//   }

//   return result;
// };

//  1차 풀이
// const solution = () => {
//   const N = Number(input());
//   const request = input().split(" ").map(Number);
//   const M = Number(input());
//   let result = 0;

//   request.sort((a, b) => a - b);

//   let low = 0;
//   let high = request[N - 1];

//   while (low <= high) {
//     const mid = parseInt((low + high) / 2);
//     let sum = 0;

//     for (let i = 0; i < N; i++) {
//       sum += Math.min(request[i], mid);
//     }

//     if (sum > M) {
//       high = mid - 1;
//     } else {
//       result = mid;
//       low = mid + 1;
//     }
//   }

//   return result;
// };

console.log(solution());
