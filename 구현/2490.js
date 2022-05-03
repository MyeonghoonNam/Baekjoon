const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `0 1 0 1
1 1 1 0
0 0 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 배: 0, 등: 1
 * 요구사항: 주어진 배와 등의 입력 정보로 도,개,걸,윷,모를 판단하여 출력
 *
 * 입력: 총 3줄
 */

const solution = () => {
  const result = [];

  for (let i = 0; i < 3; i++) {
    const data = input().split(" ").map(Number);
    let count = 0; // 배(0)의 카운트

    data.forEach((number) => {
      if (number === 0) count += 1;
    });

    switch (count) {
      case 0:
        // 모
        result.push("E");
        break;
      case 1:
        // 도
        result.push("A");
        break;
      case 2:
        // 개
        result.push("B");
        break;
      case 3:
        // 걸
        result.push("C");
        break;
      case 4:
        // 윷
        result.push("D");
        break;
    }
  }

  return result.join("\n");
};

console.log(solution());
