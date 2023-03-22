const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `23 48
25`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [A, B] = input().split(" ").map(Number);
  const C = Number(input());

  let totalMinute = (A * 60 + B + C) % 1440;
  const hour = parseInt(totalMinute / 60);
  const minute = totalMinute % 60;
  const result = `${hour} ${minute}`;

  return result;
};

console.log(solution());
