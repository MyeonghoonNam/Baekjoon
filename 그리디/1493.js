const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 10 11
1
0 1099`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [length, width, height] = input().split(" ").map(Number);
  const cubes = new Array(20).fill(0);
  const N = Number(input());

  for (let i = 0; i < N; i++) {
    const [a, b] = input().split(" ").map(Number);
    cubes[a] = b;
  }

  const nearestSquare = (size) => {
    let i = 1;

    while (2 ** i <= size) {
      i += 1;
    }

    return i - 1;
  };

  let size = 0;
  size = nearestSquare(length);
  size = Math.min(size, nearestSquare(width));
  size = Math.min(size, nearestSquare(height));

  let result = 0;
  let used = 0;

  for (let i = size; i >= 0; i--) {
    used *= 8;
    cur = 2 ** i;

    let required =
      parseInt(length / cur) * parseInt(width / cur) * parseInt(height / cur) -
      used;

    let usage = Math.min(required, cubes[i]);
    result += usage;
    used += usage;
  }

  if (used === length * width * height) return result;

  return -1;
};

console.log(solution());
