const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
5
4
3
2
1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = [];

  for (let i = 0; i < N; i++) {
    numbers.push(Number(input()));
  }

  const result = numbers.sort((a, b) => a - b).join("\n");

  return result;
};

console.log(solution());
