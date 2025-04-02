const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `100000000001101`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const string = input();
  const reg = /^(100+1+|01)+$/;
  return reg.test(string) ? "SUBMARINE" : "NOISE";
};

console.log(solution());
