const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 10
1 2 3 4 5 6 7 8 9 10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 최대한 긴 과자를 나눠주려고 한다.
 * 나눠준 과자의 길이는 모두 동일해야 한다.
 *
 * 요구 사항: N개의 과자를 M명에게 나누어줄 때 과자의 최대 길이 도출
 *
 * 과자는 길이와 상관없이 여러 조각으로 나눠질 수 있지만, 과자를 하나로 합칠 수는 없다.
 */

const solution = () => {
  const [M, N] = input().split(" ").map(Number);
  const snacks = input().split(" ").map(Number);
  let result = 0;

  let start = 1;
  let end = Math.max(...snacks);

  while (start <= end) {
    const mid = parseInt((start + end) / 2);

    if (mid === 0) break; // 모든 조카에게 같은 길이의 과자를 나눠줄 수 없을 때

    let count = 0; // 최댓값의 길이로 나눠질 수 있는 과자의 수

    for (let i = 0; i < N; i++) {
      const snack = snacks[i];

      if (snack >= mid) {
        count += parseInt(snack / mid);
      }
    }

    if (count >= M) {
      start = mid + 1;
      result = mid;
    } else {
      end = mid - 1;
    }
  }

  return result;
};

console.log(solution());
