const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
5 50 50 70 80 100
7 100 95 90 80 70 60 50
3 70 90 80
3 70 90 81
9 100 99 98 97 96 95 94 93 91`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let C = Number(input());

  while (C--) {
    const [N, ...score] = input().split(" ").map(Number);
    const average = score.reduce((acc, cur) => acc + cur) / N;
    const aboveAverageStudentCount = score.filter((s) => s > average).length;

    result.push(`${((aboveAverageStudentCount / N) * 100).toFixed(3)}%`);
  }

  return result.join("\n");
};

console.log(solution());
