const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `ACAYKP
CAPCAK`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const A = input();
  const B = input();
  const LCS = Array.from(new Array(A.length + 1), () =>
    new Array(B.length + 1).fill(0)
  );

  for (let i = 1; i <= A.length; i++) {
    for (let j = 1; j <= B.length; j++) {
      if (A[i - 1] === B[j - 1]) {
        LCS[i][j] = LCS[i - 1][j - 1] + 1;
      } else {
        LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
      }
    }
  }

  let i = A.length;
  let j = B.length;
  let result = [];

  while (i > 0 && j > 0) {
    if (LCS[i][j] === LCS[i - 1][j]) {
      i--;
    } else if (LCS[i][j] === LCS[i][j - 1]) {
      j--;
    } else if (LCS[i][j] === LCS[i - 1][j - 1] + 1) {
      result.push(A[i - 1]);
      i--;
      j--;
    }
  }

  return `${LCS[A.length][B.length]}\n${result.reverse().join("")}`;
};

console.log(solution());
