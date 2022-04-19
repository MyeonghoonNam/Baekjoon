const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
3 1 6 2 7 30 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const weights = input().split(" ").map(Number);

  // 추의 무게 오름차순 정렬
  weights.sort((a, b) => a - b);

  let result = 1;
  for (let i = 0; i < N; i++) {
    const weight = weights[i];

    if (result < weight) {
      break;
    } else {
      result += weight;
    }
  }

  return result;
};

console.log(solution());
