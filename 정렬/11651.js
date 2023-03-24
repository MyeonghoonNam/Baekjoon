const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
0 4
1 2
1 -1
2 2
3 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const coordinate = [];

  for (let i = 0; i < N; i++) {
    const [x, y] = input().split(" ").map(Number);
    coordinate.push({ x, y });
  }

  coordinate.sort((a, b) => a.y - b.y || a.x - b.x);

  let result = "";

  for (let { x, y } of coordinate) {
    result += `${x} ${y}\n`;
  }

  return result;
};

console.log(solution());
