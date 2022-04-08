const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
0 0 13 40 0 37
0 0 3 0 7 4
1 1 1 1 1 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());
  while (T--) {
    const [x1, y1, r1, x2, y2, r2] = input().split(" ").map(Number);
    const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); // 원의 방정식에 의한 두 원의 중심 거리
    const radius_sub = Math.abs(r1 - r2); // 두 원의 반지름 차
    const radius_sum = Math.abs(r1 + r2); // 두 원의 반지름 합

    if (dist === 0 && radius_sub === 0) {
      // 두 원이 동일 => 무수히 많은 점에서 만난다.
      result.push(-1);
    } else if (dist === radius_sub || dist === radius_sum) {
      // 두 원이 내접 or 외접 => 한 점에서 만난다
      result.push(1);
    } else if (dist > radius_sub && dist < radius_sum) {
      // 두 원이  서로 다른 두 점에서 만나는 경우
      result.push(2);
    } else {
      // 그 외
      result.push(0);
    }
  }

  return result.join("\n");
};

console.log(solution());
