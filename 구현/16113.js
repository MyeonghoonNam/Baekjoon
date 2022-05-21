const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `40
###..#..#.#..#..###..#..#.#..#..###..#..`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 0: '.'
 * 1: '#'
 * 시그널의 길이 = 5의 배수
 *
 * 요구사항: 주어진 조건을 활용하여 시그널의 숫자들을 순서대로 이어붙여 도출
 *
 */

const solution = () => {
  const map = {
    "####.##.##.####": "0",
    "###..#####..###": "2",
    "###..####..####": "3",
    "#.##.####..#..#": "4",
    "####..###..####": "5",
    "####..####.####": "6",
    "###..#..#..#..#": "7",
    "####.#####.####": "8",
    "####.####..####": "9",
  };
  const N = Number(input());
  const signal = input();
  const row = 5;
  const column = N / row;

  const split_signal = [];
  for (let i = 0; i < N; i += column) {
    split_signal.push(signal.slice(i, column + i));
  }

  let result = "";
  for (let i = 0; i < column; i++) {
    // 숫자
    if (split_signal[0][i] === "#") {
      // 숫자 1에 대한 예외처리
      // 맨 끝줄인데 #으로 시작하는 경우 or 다음 줄이 '.' 이면서 3번째 행이 '#'인 경우를 통해 4와 구분
      if (
        i === column - 1 ||
        (split_signal[0][i + 1] === "." && split_signal[3][i] === "#")
      ) {
        result += "1";
        continue;
      }

      // 0, 2, 3, 4, 5, 6, 7, 8, 9 숫자 처리
      let string_number = "";
      for (let j = 0; j < 5; j++) {
        string_number += split_signal[j].slice(i, i + 3);
      }

      if (map[string_number]) {
        result += map[string_number];
        i += 3; // 시그널의 공백은 최소 1줄 이상이므로
      }
    }
  }

  return result;
};

console.log(solution());
