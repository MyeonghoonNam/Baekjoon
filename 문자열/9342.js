const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `15
AFC
AAFC
AAAFFCC
AAFCC
BAFC
QWEDFGHJMNB
DFAFCB
ABCDEFC
DADC
SDFGHJKLQWERTYU
AAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCDDDDDDDDDDDEEEEEEEEEEEEEEEFFFFFFFFC
AAAFFFFFBBBBCCCAAAFFFF
ABCDEFAAAFFFCCCABCDEF
AFCP
AAFFCPP`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let t = Number(input());
  const result = [];
  const reg = /^[ABCDEF]?A+F+C+[ABCDEF]?$/;

  while (t--) {
    const string = input();
    result.push(reg.test(string) ? "Infected!" : "Good");
  }

  return result.join("\n");
};

console.log(solution());
