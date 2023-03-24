const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `13
but
i
wont
hesitate
no
more
no
more
it
cannot
wait
im
yours`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const set = new Set();

  for (let i = 0; i < N; i++) {
    set.add(input());
  }

  const words = [...set];
  words.sort((a, b) => a.length - b.length || a.localeCompare(b));

  const result = words.join("\n");
  return result;
};

console.log(solution());
