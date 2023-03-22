const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
10 20 30`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const score = input().split(" ").map(Number);
  const maxScore = Math.max(...score);
  const newScore = score.map((s) => (s / maxScore) * 100);

  const result = newScore.reduce((acc, cur) => acc + cur) / N;

  return result;
};

console.log(solution());
