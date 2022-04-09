const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
35
33
20
30
12`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const weights = [];
  let result = 0;

  for (let i = 0; i < N; i++) {
    weights.push(Number(input()));
  }

  weights.sort((a, b) => b - a);

  for (let i = 0, c = 1; i < N; i++, c++) {
    const weight = weights[i];

    if (result < weight * c) {
      result = weight * c;
    }
  }

  return result;
};

console.log(solution());
