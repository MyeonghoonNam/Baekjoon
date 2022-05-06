const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `25 5 2
2
14
11
21
17`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [D, N, M] = input().split(" ").map(Number);
  const position = [0, D];

  for (let i = 0; i < N; i++) {
    const data = Number(input());
    position.push(data);
  }

  position.sort((a, b) => a - b);

  let start = 1;
  let end = D;
  let result = 0;

  while (start <= end) {
    const mid = parseInt((start + end) / 2); // 두 개의 작은 돌섬 사이의 거리
    let count = 0; // mid를 기준으로 건널 수 있는 돌 섬의 개수
    let current_position = 0;

    for (let i = 1; i < position.length; i++) {
      const dist = position[i] - current_position;

      if (dist < mid) {
        // mid 보다 작으면 돌 섬을 제거 가능
        count += 1;
      } else {
        // 점프를 다시 시도할 돌섬 위치 갱신
        current_position = position[i];
      }
    }

    if (count > M) {
      end = mid - 1;
    } else {
      result = mid;
      start = mid + 1;
    }
  }

  return result;
};

console.log(solution());
