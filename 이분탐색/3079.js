const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 10
3
8
3
6
9
2
4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 총 M명, 입국심사대 N개
 * k번 심사대에 앉아있는 심사관이 한 명을 심사하는데 드는 시간은 T(k)
 * 한 심사대에서는 한 번에 한 사람만 심사 가능
 *
 * 요구사항: 모든 사람을 심사하는데에 드는 최소 시간 도출
 *
 * 심사시간의 범위를 최소시간과 최대시간으로 범위를 지정하여 조건에 맞는 심사가 가능한 최소시간을 추려나가는 이분탐색으로 문제 해결이 가능하다.
 */

const solution = () => {
  const [N, M] = input().split(" ").map(BigInt);
  const T = [];
  let result = 0n;
  let max_time = 0n;

  for (let i = 0; i < N; i++) {
    const data = BigInt(input());

    if (max_time < data) max_time = data;
    T.push(data);
  }

  let start = 0n; // 최소시간
  let end = max_time * M; // 최대시간

  while (start <= end) {
    const mid = (start + end) / 2n;
    let people = 0n;

    for (let i = 0; i < N; i++) {
      if (people >= M) break;

      const time = T[i];
      people += mid / time;
    }

    if (people < M) {
      start = mid + 1n;
    } else {
      end = mid - 1n;
      result = mid;
    }
  }

  return result.toString();
};

console.log(solution());
