const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
39 38 9 35 39 20`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const treeDay = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);
  const time = [];

  for (let i = 0; i < N; i++) {
    time.push(i + 1 + treeDay[i]);
  }

  time.sort((a, b) => b - a);

  const result = time[0] + 1;

  return result;
};

console.log(solution());
