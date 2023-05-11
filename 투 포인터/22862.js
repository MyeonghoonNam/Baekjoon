const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8 2
1 2 3 4 5 6 7 8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const S = input().split(" ").map(Number);
  let result = 0;
  let eraseCount = 0;

  for (let start = 0, end = 0; start < N; start++) {
    while (end < N) {
      if (S[end] % 2 !== 0) {
        if (eraseCount === K) break;
        eraseCount += 1;
      }

      end += 1;
    }

    result = Math.max(result, end - start - eraseCount);

    if (S[start] % 2 === 1) {
      eraseCount -= 1;
    }
  }

  return result;
};

console.log(solution());
