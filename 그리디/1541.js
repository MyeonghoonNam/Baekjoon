const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `55-50+40`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const groups = input().split("-");
  let result = 0;

  for (let i = 0; i < groups.length; i++) {
    const sum = groups[i]
      .split("+")
      .map(Number)
      .reduce((acc, cur) => acc + cur);

    i === 0 ? (result += sum) : (result -= sum);
  }

  return result;
};

console.log(solution());
