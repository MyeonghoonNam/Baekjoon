const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `The Curious Case of Benjamin Button`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const str = input().trim().split(" ");
  const result = str[0] === "" ? 0 : str.length;

  return result;
};

console.log(solution());
