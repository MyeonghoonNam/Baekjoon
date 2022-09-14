const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
1
5
3
1
2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 불만도 = |예상 등수 - 실제 등수|
 *
 * 요구사항 : 불만도의 합을 최소로 하여 도출
 *
 * 예상 등수를 오름차순으로 정렬하여 실제 등수와의 격차를 좁게하면 최소의 불만도를 도출 할 수 있다.
 */

const solution = () => {
  const N = Number(input());
  const score = [];

  for (let i = 0; i < N; i++) {
    score.push(Number(input()));
  }

  score.sort((a, b) => a - b);

  const result = score.reduce((acc, cur, i) => {
    return (acc += Math.abs(cur - (i + 1)));
  }, 0);

  return result;
};

console.log(solution());
