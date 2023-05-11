const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 3
2 3 5 9
1 4 7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const A = input().split(" ").map(Number);
  const B = input().split(" ").map(Number);
  const result = [];

  let p1 = 0;
  let p2 = 0;

  while (p1 < N && p2 < M) {
    if (A[p1] < B[p2]) {
      result.push(A[p1]);
      p1 += 1;
    } else {
      result.push(B[p2]);
      p2 += 1;
    }
  }

  while (p1 < N) {
    result.push(A[p1]);
    p1 += 1;
  }

  while (p2 < M) {
    result.push(B[p2]);
    p2 += 1;
  }

  return result.join(" ");
};

console.log(solution());
