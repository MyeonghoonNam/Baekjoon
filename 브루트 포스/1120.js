const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `giorgi igroig`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [A, B] = input().split(" ");
  let result = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i <= B.length - A.length; i++) {
    let diffCharCount = 0;

    for (let j = 0; j < A.length; j++) {
      if (B[i + j] !== A[j]) {
        diffCharCount++;
      }
    }

    if (result > diffCharCount) {
      result = diffCharCount;
    }
  }

  return result;
};

console.log(solution());
