const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
3 7
15 7
5 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 가로, 세로 크기의 도화지 => 100
 * 가로, 세로 크기가 10인 정사각형의 검은색 색종이를 한 장 또는 여러 장 붙인 후 도화지에 올린다.
 *
 * 요구사항: 도화지 위에 올려진 검은색 색종이 영역의 넓이 구하기
 *
 */

const solution = () => {
  const N = Number(input());
  const map = Array.from(new Array(100), () => new Array(100).fill(0));
  let result = 0;

  for (let c = 0; c < N; c++) {
    const [x, y] = input().split(" ").map(Number);

    for (let i = x; i < x + 10; i++) {
      for (let j = y; j < y + 10; j++) {
        if (map[i][j] === 1) continue;
        map[i][j] = 1;
        result += 1;
      }
    }
  }

  return result;
};

console.log(solution());
