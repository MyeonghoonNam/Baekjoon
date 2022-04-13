const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
10 9 10 9 10
7 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const candidate = input().split(" ").map(Number);
  const [B, C] = input().split(" ").map(Number);

  let result = 0;

  for (let i = 0; i < N; i++) {
    // 총 감독관은 무조건 최소 1명
    candidate[i] -= B;
    result += 1;

    if (candidate[i] > 0) {
      // 부 감독관 배치
      result += Math.floor(candidate[i] / C);

      if (candidate[i] % C > 0) {
        result += 1;
      }
    }
  }

  return result;
};

console.log(solution());
