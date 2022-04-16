const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
1
1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const plus = [];
  const minus = [];
  let result = 0;

  for (let i = 0; i < N; i++) {
    const number = Number(input());

    if (number <= 0) {
      minus.push(number);
    } else if (number > 1) {
      plus.push(number);
    } else if (number === 1) {
      result += 1; // 1의 경우 덧셈이 더 최댓값이므로 미리 덧셈
    }
  }

  plus.sort((a, b) => b - a);
  minus.sort((a, b) => a - b);

  for (let i = 0; i < plus.length; i += 2) {
    if (i + 1 < plus.length) {
      result += plus[i] * plus[i + 1];
    } else {
      result += plus[i];
    }
  }

  for (let i = 0; i < minus.length; i += 2) {
    if (i + 1 < minus.length) {
      result += minus[i] * minus[i + 1];
    } else {
      result += minus[i];
    }
  }

  return result;
};

console.log(solution());
