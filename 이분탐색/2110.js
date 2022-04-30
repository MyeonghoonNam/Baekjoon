const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
1
2
8
4
9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항: C개의 공유기를 N개의 집에 설치하여 가장 인접한 두 공유기 사이의 거리 최댓값 도출
 *
 * 하나의 집에는 하나의 공유기만 설치 가능
 *
 * 1. 입력값이 상당히 크므로 O(logN)의 시간복잡도 안에 해결하려면 이진탐색을 수행한다.
 * 2. 공유기 사이의 거리를 이진탐색으로 모두 탐색하여 C개의 공유기에서 최댓값을 찾아야 한다.
 */

const solution = () => {
  const [N, C] = input().split(" ").map(Number);
  const homes = [];

  for (let i = 0; i < N; i++) {
    homes.push(Number(input()));
  }

  homes.sort((a, b) => a - b);

  const result = binarySearch(homes, C, N);
  return result;
};

const binarySearch = (homes, total_count, length) => {
  let start = 1; // 최소 간격
  let end = homes[length - 1] - homes[0]; // 최대 간격
  let result = 0;

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    let value = homes[0];
    let current_count = 1;

    for (let i = 1; i < length; i++) {
      if (homes[i] >= value + mid) {
        value = homes[i];
        current_count += 1;
      }
    }

    if (current_count >= total_count) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return result;
};

console.log(solution());
