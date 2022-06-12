const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `ababc`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const S = input();
  const set = new Set();

  let str = "";
  for (let i = 0; i < S.length; i++) {
    for (let j = i; j < S.length; j++) {
      str += S[j];
      set.add(str);
    }

    str = "";
  }

  return set.size;
};

console.log(solution());
