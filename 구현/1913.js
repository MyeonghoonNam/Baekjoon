const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
35`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 짝수, 홀수 => N
 * 안, 밖 감기
 */

// 바깥쪽에서 안쪽으로 도는 경우
const solution1 = () => {
  const N = Number(input());
  const NUMBER = Number(input());
  const map = Array.from(new Array(N), () => new Array(N).fill(0));
  let value = N * N;
  let x = -1;
  let y = 0;
  let increment = 1;
  let repeatCount = N;
  let position = "";

  while (repeatCount > 0) {
    for (let i = 0; i < repeatCount; i++) {
      x += increment;
      map[x][y] = value;

      if (map[x][y] === NUMBER) {
        position = `${x + 1} ${y + 1}`;
      }

      value -= 1;
    }

    repeatCount--;

    if (repeatCount === 0) break;

    for (let i = 0; i < repeatCount; i++) {
      y += increment;
      map[x][y] = value;

      if (map[x][y] === NUMBER) {
        position = `${x + 1} ${y + 1}`;
      }

      value -= 1;
    }

    increment *= -1;
  }

  const result = `${print(map)}\n${position}`;
  return result;
};

const print = (map) => {
  let result = [];

  map.forEach((row) => {
    result.push(row.join(" "));
  });

  return result.join("\n");
};

console.log(solution1());
