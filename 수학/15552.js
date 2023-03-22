const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
1 1
12 34
5 500
40 60
1000 1000`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const [A, B] = input().split(" ").map(Number);
    result.push(A + B);
  }

  return result.join("\n");
};

console.log(solution());
