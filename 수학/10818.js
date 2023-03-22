const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
20 10 35 30 7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// Math 함수 풀이
const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);

  const minValue = Math.min(...numbers);
  const maxValue = Math.max(...numbers);

  const result = `${minValue} ${maxValue}`;

  return result;
};

// reduce 풀이
// const solution = () => {
//   const N = Number(input());
//   const numbers = input().split(" ").map(Number);

//   const minValue = numbers.reduce((acc, cur) => Math.min(acc, cur));
//   const maxValue = numbers.reduce((acc, cur) => Math.max(acc, cur));

//   const result = `${minValue} ${maxValue}`;

//   return result;
// };

console.log(solution());
