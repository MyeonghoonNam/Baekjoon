const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
2 4 -10 4 -9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const uniqueNumbers = [...new Set(numbers)].sort((a, b) => a - b);
  const uniqueNumbersMap = new Map();

  for (let i = 0; i < uniqueNumbers.length; i++) {
    const number = uniqueNumbers[i];
    uniqueNumbersMap.set(number, i);
  }

  for (let i = 0; i < N; i++) {
    const number = numbers[i];
    result.push(uniqueNumbersMap.get(number));
  }

  return result.join(" ");
};

console.log(solution());
