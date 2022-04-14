const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 8 20
5 8 17
0 0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let result = [];
  let T = 0;

  while (true) {
    const [L, P, V] = input().split(" ").map(Number);
    T += 1;

    if (L === 0 && P === 0 && V === 0) break;

    const repeat = Math.floor(V / P);
    let remain = V % P;

    if (L < remain) {
      remain = L;
    }

    result.push(`Case ${T}: ${repeat * L + remain}`);
  }

  return result.join("\n");
};

console.log(solution());
