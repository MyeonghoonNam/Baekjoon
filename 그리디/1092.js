const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
19 20
7
14 12 16 19 16 1 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const crane = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);
  const M = Number(input());
  const box = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

  if (crane[0] < box[0]) {
    return -1;
  }

  let result = 0;
  while (box.length !== 0) {
    let boxIndex = 0;
    for (let craneIndex = 0; craneIndex < crane.length; ) {
      if (boxIndex === box.length) break;
      else if (crane[craneIndex] >= box[boxIndex]) {
        box.splice(boxIndex, 1);
        craneIndex++;
      } else {
        boxIndex++;
      }
    }

    result++;
  }

  return result;
};

console.log(solution());
