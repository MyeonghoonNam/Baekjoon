const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
1 2 3 1 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const numbers = [0, ...input().split(" ").map(Number)];
  const prefixSum = [0];

  for (let i = 1; i <= N; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i];
  }

  const mod = [];
  const counter = {};

  for (let i = 0; i <= N; i++) {
    mod[i] = prefixSum[i] % M;

    if (mod[i] in counter) counter[mod[i]] += 1;
    else counter[mod[i]] = 1;
  }

  let result = 0;

  for (let i = 0; i < M; i++) {
    if (i in counter) {
      result += (counter[i] * (counter[i] - 1)) / 2;
    }
  }

  return result;
};

console.log(solution());
