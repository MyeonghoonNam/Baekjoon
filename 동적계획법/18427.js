const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 3 5
2 3 5
3 5
1 2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M, H] = input().split(" ").map(Number);
  const DP = new Array(H + 1).fill(0);
  const student = [];

  for (let i = 0; i < N; i++) {
    student.push(input().split(" ").map(Number));
  }

  DP[0] = 1;

  for (let i = 0; i < N; i++) {
    let cases = [];

    for (let j = 0; j <= H; j++) {
      for (let k = 0; k < student[i].length; k++) {
        if (DP[j] !== 0 && student[i][k] + j <= H) {
          cases.push([j + student[i][k], DP[j]]);
        }
      }
    }

    for (let j = 0; j < cases.length; j++) {
      const [height, value] = cases[j];
      DP[height] = (DP[height] + value) % 10007;
    }
  }

  return DP[H];
};

console.log(solution());
