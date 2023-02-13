const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 41`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [D, K] = input().split(" ").map(Number);

  const A = [0, 1, 0];
  const B = [0, 0, 1];

  for (let i = 3; i <= D; i++) {
    A[i] = A[i - 1] + A[i - 2];
    B[i] = B[i - 1] + B[i - 2];
  }

  for (let i = 1; i <= K; i++) {
    const spare = K - A[D] * i;

    if (spare % B[D] === 0) {
      return `${i}\n${spare / B[D]}`;
    }
  }
};

console.log(solution());
