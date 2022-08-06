const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `20 2
HHHHHPPPPPHPHPHPHHHP`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const arr = input().split("");
  let result = 0;

  for (let i = 0; i < N; i++) {
    if (arr[i] != "P") continue;

    for (let j = i - K; j <= i + K; j++) {
      if (0 <= j && j < N && arr[j] === "H") {
        arr[j] = "-";
        result++;
        break;
      }
    }
  }

  return result;
};

console.log(solution());
