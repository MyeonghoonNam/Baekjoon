const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 7 800
622 411 201 555 755 82`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * N개의 휴게소
 * 휴게소 위치는 고속도로의 시작점 부터 얼마나 떨어져 있는지로 주어진다.
 * 휴게소 M개를 더 세우려고 한다.
 * 휴게소가 있는 곳과 고속도로의 끝에는 휴게소를 세울 수 없다.
 * 휴게소는 정수 위치에만 세울 수 있다.
 *
 * 요구사항: 휴게소 M개를 더 지었을 때 휴게소가 없는 구간의 길이의 최댓값을 최소로 하는 값을 도출
 */

const solution = () => {
  const [N, M, L] = input().split(" ").map(Number);
  const position = input().split(" ").map(Number);

  position.push(0);
  position.push(L);

  position.sort((a, b) => a - b);

  let start = 1;
  let end = L;
  let result = 0;

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    let count = 0;

    for (let i = 1; i < N + 2; i++) {
      const dist = position[i] - position[i - 1];

      if (dist > mid) {
        count += parseInt(dist / mid);

        if (dist % mid === 0) {
          count -= 1;
        }
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
