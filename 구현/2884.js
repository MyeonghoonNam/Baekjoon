const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `0 30`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항: 기존에 설정한 알람 시각에서 45분 일찍 새로 설정하는 알람시간 도출
 *
 * H시 M분
 * 하루의 시작 => 0:0
 * 하루의 끝 => 23:59
 * 시간을 나타낼 때 불필요한 0은 사용하지 않는다.
 */

const solution = () => {
  let [H, M] = input().split(" ").map(Number);

  if (M >= 45) {
    M -= 45;
  } else {
    M = 60 - (45 - M);

    if (H === 0) {
      H = 23;
    } else {
      H -= 1;
    }
  }

  return `${H} ${M}`;
};

console.log(solution());
