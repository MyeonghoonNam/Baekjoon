const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `11101101`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const S = input();
  let zero_one = 0;
  let one_zero = 0;

  if (S[0] === "1") {
    // 1 => 0
    one_zero += 1;
  } else {
    // 0 => 1
    zero_one += 1;
  }

  for (let i = 0; i < S.length - 1; i++) {
    const prev = S[i];
    const next = S[i + 1];

    if (prev !== next) {
      if (next === "1") {
        one_zero += 1;
      } else {
        zero_one += 1;
      }
    }
  }

  return Math.min(zero_one, one_zero);
};

console.log(solution());
