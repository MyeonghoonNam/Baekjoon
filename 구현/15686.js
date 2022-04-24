const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 빈칸, 집, 치킨집 => 0, 1, 2
// 치킨거리 = 집과 가장 가까운 치킨집 사이의 거리
// 도시의 치킨 거리 = 치킨거리의 총 합
// 임의의 두 칸 사이 거리 |r1 - r2| + |c1 - c2| (r, c => 1부터 시작)

// M = 가장 수익을 많이 낼 수 있는 치킨집의 개수
// 도시의 치킨집 중 최대 M개를 고르고 나머지는 모두 폐업

// 요구 사항: M개의 치킨집을 골라 도시의 치킨 거리의 최솟값을 도출하기
// 접근
// 1. 전체 치킨집을 M개가 남을때까지 폐업
//  1-1. 치킨집 M개를 선택하는 경우의 수를 조합으로 도출
// 2. M개의 치킨집을 토대로 도시의 치킨거리 도출
//  2-1. 집과 치킨집의 거리를 비교하여 집에서 가장 가까운 치킨거리 도출
//  2-2. 도출한 치킨거리를 모두 더해 도시의 치킨거리 도출
//  2-3. 도출한 도시의 치킨거리를 기존 도시의 치킨거리와 비교하여 최솟값 갱신

const combination = (arr, max_count) => {
  const selected = new Array(arr.length).fill(false);
  const result = [];
  const dfs = (idx, count) => {
    if (count === max_count) {
      const candidate = [];

      for (let i = 0; i < arr.length; i++) {
        if (selected[i]) {
          candidate.push(arr[i]);
        }
      }

      result.push(candidate);
      return;
    }

    for (let i = idx; i < arr.length; i++) {
      if (selected[i] === true) continue;

      selected[i] = true;
      dfs(i + 1, count + 1);
      selected[i] = false;
    }
  };

  dfs(0, 0);
  return result;
};

const getDistance = (candidate, house_position) => {
  let result = 0;

  house_position.forEach(({ x: hx, y: hy }) => {
    let distance = Number.MAX_SAFE_INTEGER;

    candidate.forEach(({ x: cx, y: cy }) => {
      const dist = Math.abs(hx - cx) + Math.abs(hy - cy);
      distance = Math.min(distance, dist);
    });

    result += distance;
  });

  return result;
};

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const house_position = [];
  const chicken_position = [];

  for (let i = 0; i < N; i++) {
    const data = input().split(" ").map(Number);

    for (let j = 0; j < N; j++) {
      if (data[j] === 2) {
        // 치킨집 좌표 저장
        chicken_position.push({ x: i, y: j });
      } else if (data[j] === 1) {
        // 집 좌표 저장
        house_position.push({ x: i, y: j });
      }
    }
  }

  const candidates = combination(chicken_position, M);
  let result = Number.MAX_SAFE_INTEGER;

  candidates.forEach((candidate) => {
    result = Math.min(result, getDistance(candidate, house_position));
  });

  return result;
};

console.log(solution());
