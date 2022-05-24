const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
FFLF
FFRRFF
FFFBBBRFFFBBB`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 이동가능한 경로: 앞과 뒤(바라보는 방향 기준)
 * 바라보는 방향: 상,하,좌,우
 *
 * 요구사항: 거북이가 지나간 영역을 모두 포함하는 직사각형 넓이 도출
 */
const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const mod = input().split("");
    let x = 0;
    let y = 0;
    let max_x = 0;
    let max_y = 0;
    let min_x = 0;
    let min_y = 0;

    let direction = 0;
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    for (let i = 0; i < mod.length; i++) {
      const char = mod[i];

      if (char === "L" || char === "R") {
        // 방향 회전만 하는 경우
        if (char === "L") {
          direction = (direction + 3) % 4;
        } else {
          // R
          direction = (direction + 1) % 4;
        }
      } else {
        // 전진 or 후진
        if (char === "F") {
          x += dx[direction];
          y += dy[direction];
        } else {
          x -= dx[direction];
          y -= dy[direction];
        }

        // 최대, 최소 지점 갱신
        max_x = Math.max(x, max_x);
        max_y = Math.max(y, max_y);
        min_x = Math.min(x, min_x);
        min_y = Math.min(y, min_y);
      }
    }

    const area = (max_x - min_x) * (max_y - min_y);
    result.push(area);
  }

  return result.join("\n");
};

console.log(solution());
