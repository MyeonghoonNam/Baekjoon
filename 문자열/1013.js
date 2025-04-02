const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
10010111
011000100110001
0110001011001`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let t = Number(input());
  const result = [];
  const reg = /^(100+1+|01)+$/;

  while (t--) {
    const string = input();
    result.push(reg.test(string) ? "YES" : "NO");
  }

  return result.join("\n");
};

console.log(solution());
