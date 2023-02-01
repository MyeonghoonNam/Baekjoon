const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `75
80`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const M = Number(input());
  const N = Number(input());
  const arr = [];

  for (let i = M; i <= N; i++) {
    if (Number.isInteger(Math.sqrt(i))) {
      arr.push(i);
    }
  }

  if (arr.length === 0) {
    return -1;
  }

  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  const min = Math.min(...arr);
  const result = `${sum}\n${min}`;

  return result;
};

console.log(solution());
