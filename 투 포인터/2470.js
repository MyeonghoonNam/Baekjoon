const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
-2 4 -99 -1 98`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 산성: 1 ~ 1000000000 범위의 특성
 * 알칼리성: -1 ~ -1000000000 범위의 특성
 * 같은 양의 두 용액을 혼합한 특성값은 각 용액의 특성값의 합으로 정의
 *
 * 요구사항 : 같은 양의 두 용액을 혼합한 특성값이 0에 가장 가까운 용액 만들기
 *
 * 새로 만든 용액에 포함되는 두 용액의 특성값을 오름차순으로 출력
 * 새로 만든 용액의 경우가 여러개인 경우 아무것이나 하나 출력
 *
 * 1. 용액의 특성을 오름차순 정렬
 * 2. 시작점과 끝점을 활용하는 투 포인터 알고리즘 활용
 */

const solution = () => {
  const N = Number(input());
  const arr = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  const result = [0, 0];

  let start = 0;
  let end = N - 1;
  let min = Number.MAX_SAFE_INTEGER;

  while (start < end) {
    const sum = arr[start] + arr[end];

    if (min > Math.abs(sum)) {
      min = Math.abs(sum);
      result[0] = arr[start];
      result[1] = arr[end];

      if (sum === 0) {
        break;
      }
    }

    if (sum > 0) {
      end -= 1;
    } else {
      start += 1;
    }
  }

  return result.join(" ");
};

console.log(solution());
