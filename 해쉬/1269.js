const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 5
1 2 4
2 3 4 5 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const a = new Set(input().split(" ").map(Number));
  const b = new Set(input().split(" ").map(Number));
  const union = new Set([...a, ...b]);

  union.forEach((value) => {
    if (a.has(value)) {
      if (b.has(value)) {
        union.delete(value);
      }
    }
  });

  a.forEach((value) => {
    if (b.has(value)) {
      union.delete(value);
    }
  });

  return union.size;
};

console.log(solution());
