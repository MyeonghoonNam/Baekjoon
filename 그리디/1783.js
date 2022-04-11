const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `20 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  /**
   * 세로 1 => 움직이지 못함 1칸
   * 세로 2 => 2, 3번 조건을 최대 3번까지 활용
   * 세로 3 이상, 가로 6 이하 => 1, 4번 후 2번 or 3번으로 총 3회 이동으로 최대 4칸
   * 세로 3 이상, 가로 7 이상(4번의 움직임 모두 사용 가능) => 2, 3번 1회, 나머지는 1, 4번 모두 이동
   */

  const [N, M] = input().split(" ").map(Number);
  let result = 0;

  if (N === 1) {
    result = 1;
  } else if (N === 2) {
    result = Math.min(4, Math.floor((M + 1) / 2));
  } else if (N >= 3 && M <= 6) {
    result = Math.min(4, M);
  } else if (N >= 3 && M >= 7) {
    result = M - 2;
  }

  return result;
};

console.log(solution());
