const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 11
baekjoononlinejudge
startlink
codeplus
sundaycoding
codingsh
baekjoon
codeplus
codeminus
startlink
starlink
sundaycoding
codingsh
codinghs
sondaycoding
startrink
icerink`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const S = new Map();
  let result = 0;

  for (let i = 0; i < N; i++) {
    const str = input();

    S.set(str, true);
  }

  for (let i = 0; i < M; i++) {
    const str = input();

    if (S.has(str)) {
      result++;
    }
  }

  return result;
};

console.log(solution());
