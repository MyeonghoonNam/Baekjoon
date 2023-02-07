const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `16796 58786`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [A, B] = input().split(" ");

  const minA = Number(A.replaceAll("6", "5"));
  const minB = Number(B.replaceAll("6", "5"));
  const maxA = Number(A.replaceAll("5", "6"));
  const maxB = Number(B.replaceAll("5", "6"));

  const result = `${minA + minB} ${maxA + maxB}`;
  return result;
};

console.log(solution());
