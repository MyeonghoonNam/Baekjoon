const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `ABCDE
abcde
01234
FGHIJ
fghij`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 각 줄의 단어는 최소 1개, 최대 15개의 글자들이 빈칸 없이 연속으로 주어진다.
 * 각 줄의 시작과 마지막에 빈칸은 없다.
 *
 * 요구사항 : 주어진 단어 5줄을 맨 좌측상단 부터 세로로 읽어 한 줄로 출력
 */

const solution = () => {
  const arr = Array.from(new Array(5), () => new Array(15));

  for (let i = 0; i < arr.length; i++) {
    const word = input();

    for (let j = 0; j < word.length; j++) {
      arr[i][j] = word[j];
    }
  }

  let result = "";
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 5; j++) {
      result += arr[j][i] ?? "";
    }
  }

  return result;
};

console.log(solution());
