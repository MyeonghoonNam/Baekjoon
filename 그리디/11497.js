const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
7
13 10 12 11 10 11 12
5
2 4 5 7 9
8
6 6 6 6 6 6 6 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];

  let T = Number(input());
  while (T--) {
    const N = Number(input());
    const woods = input().split(" ").map(Number);

    woods.sort((a, b) => a - b);

    let max = 0;
    for (let i = 2; i < N; i++) {
      max = Math.max(max, Math.abs(woods[i] - woods[i - 2]));
    }

    result.push(max);
  }

  return result.join("\n");
};

console.log(solution());
