const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `39
40
41
42
43
44
82
83
84
85`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const numbers = stdin.map(Number);
  const set = new Set();

  for (let i = 0; i < 10; i++) {
    set.add(numbers[i] % 42);
  }

  const result = set.size;

  return result;
};

console.log(solution());
