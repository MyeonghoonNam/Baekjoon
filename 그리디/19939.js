const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const sum = (K * (K + 1)) / 2;

  if (sum > N) {
    return -1;
  }

  if ((N - sum) % K === 0) {
    return K - 1;
  }

  return K;
};

console.log(solution());
