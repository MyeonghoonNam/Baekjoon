const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 10 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  // 여 2, 남 1 => 1팀
  // 여 N, 남 M명
  // K명 인턴쉽 참여하며 대회는 참여 못함
  // 위 조건으로 많은 팀 만들기

  const [N, M, K] = input().split(" ").map(Number);

  let count_woman = N;
  let count_man = M;
  let result = 0;

  while (
    count_woman >= 2 &&
    count_man >= 1 &&
    count_woman + count_man >= K + 3
  ) {
    count_woman -= 2;
    count_man -= 1;
    result += 1;
  }

  return result;
};

console.log(solution());
