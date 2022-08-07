const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
4
5
6
7
20`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const leg = [];
  let result = 0;

  for (let i = 0; i < N; i++) {
    leg.push(Number(input()));
  }

  leg.sort((a, b) => b - a);

  // 삼각형의 성립 조건 : 가장 긴 변의 길이 < 나머지 두 변의 길이의 합
  for (let i = 0; i < N - 2; i++) {
    const c = leg[i]; // 가장 긴 변
    const b = leg[i + 1];
    const a = leg[i + 2];

    if (c < b + a) {
      result = c + b + a;
      return result;
    }
  }

  result = -1;
  return result;
};

console.log(solution());
