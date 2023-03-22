const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `839 237`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [A, B] = input().split(" ");

  const newA = Number(A[2] + A[1] + A[0]);
  const newB = Number(B[2] + B[1] + B[0]);

  const result = Math.max(newA, newB);

  return result;
};

console.log(solution());
