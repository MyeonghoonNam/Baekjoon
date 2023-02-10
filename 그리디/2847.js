const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
5
3
7
5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = [];
  let result = 0;

  for (let i = 0; i < N; i++) {
    numbers.unshift(Number(input()));
  }

  for (let i = 0; i < N - 1; i++) {
    const target = numbers[i] - 1;

    if (target < numbers[i + 1]) {
      result += numbers[i + 1] - target;
      numbers[i + 1] = target;
    }
  }

  return result;
};

console.log(solution());
