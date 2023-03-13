const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `abcdefghijklmn
bdefg
efg`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const A = input();
  const B = input();
  const C = input();

  const LCS = Array.from(new Array(A.length + 1), () =>
    Array.from(new Array(B.length + 1), () => new Array(C.length + 1).fill(0))
  );

  for (let i = 1; i <= A.length; i++) {
    for (let j = 1; j <= B.length; j++) {
      for (let k = 1; k <= C.length; k++) {
        if (A[i - 1] === B[j - 1] && B[j - 1] === C[k - 1]) {
          LCS[i][j][k] = LCS[i - 1][j - 1][k - 1] + 1;
        } else {
          LCS[i][j][k] = Math.max(
            LCS[i - 1][j][k],
            Math.max(LCS[i][j - 1][k], LCS[i][j][k - 1])
          );
        }
      }
    }
  }

  const result = LCS[A.length][B.length][C.length];

  return result;
};

console.log(solution());
