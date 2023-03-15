const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
5
10
7
3
8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  let dasom = Number(input());
  const vote = [];
  let result = 0;

  for (let i = 0; i < N - 1; i++) {
    vote.push(Number(input()));
  }

  vote.sort((a, b) => b - a);

  if (N === 1) {
    return 0;
  }

  while (vote[0] >= dasom) {
    dasom += 1;
    vote[0] -= 1;
    result += 1;

    vote.sort((a, b) => b - a);
  }

  return result;
};

console.log(solution());
