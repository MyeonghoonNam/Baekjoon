const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2 2
2 1
3 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [R, C] = input().split(" ").map(Number);
  const map = [];
  let min_pleasure = Number.MAX_SAFE_INTEGER;
  let result = "";
  let blank = {}; // x, y 좌표

  for (let i = 0; i < R; i++) {
    const data = input().split(" ").map(Number);

    for (let j = 0; j < C; j++) {
      if (min_pleasure > data[j] && (i + j) % 2 === 1) {
        min_pleasure = data[j];
        blank.x = i;
        blank.y = j;
      }
    }
  }

  // 행의 수가 홀수인 경우
  if (R % 2 === 1) {
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C - 1; j++) {
        if (i % 2 === 0) {
          result += "R";
        } else {
          result += "L";
        }
      }

      if (i === R - 1) break;
      result += "D";
    }
  } else if (C % 2 === 1) {
    // 열의 수가 홀수인 경우
    for (let i = 0; i < C; i++) {
      for (let j = 0; j < R - 1; j++) {
        if (i % 2 === 0) {
          result += "D";
        } else {
          result += "U";
        }
      }

      if (i === C - 1) break;
      result += "R";
    }
  } else {
    // 행과 열의 수가 모두 짝수인 경우
    let r = 0;
    let c = 0;

    if (blank.x % 2 === 0) {
      r = blank.x;
    } else {
      r = blank.x - 1;
    }

    // blank 포함하는 두줄 전까지
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < C - 1; j++) {
        if (i % 2 === 0) {
          result += "R";
        } else {
          result += "L";
        }
      }

      result += "D";
    }

    c = blank.y;

    // blank 포함하는 두줄에서 blank 전까지
    for (let i = 0; i < c; i++) {
      if (i % 2 === 0) {
        result += "DR";
      } else {
        result += "UR";
      }
    }

    // blank 포함하는 두줄에서 blank 후
    for (let i = c; i < C - 1; i++) {
      if (i % 2 === 0) {
        result += "RD";
      } else {
        result += "RU";
      }
    }

    // blank 포함하는 두줄을 지난 후의 모든 줄
    for (let i = r + 2; i < R; i++) {
      result += "D";

      for (let j = 0; j < C - 1; j++) {
        if (i % 2 === 0) {
          result += "L";
        } else {
          result += "R";
        }
      }
    }
  }

  return result;
};

console.log(solution());
