const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3 ABC
5 /HTP`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const [R, S] = input().split(" ");
    let str = "";

    for (let i = 0; i < S.length; i++) {
      str += S[i].repeat(Number(R));
    }

    result.push(str);
  }

  return result.join("\n");
};

console.log(solution());
