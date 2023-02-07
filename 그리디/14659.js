const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
6 4 10 2 5 7 11`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const mountain = input().split(" ").map(Number);
  let result = 0;

  for (let i = 0; i < N - 1; i++) {
    const hanzo = mountain[i];
    let count = 0;

    for (let j = i + 1; j < N; j++) {
      if (hanzo > mountain[j]) {
        count++;
      } else {
        break;
      }
    }

    if (result < count) {
      result = count;
    }
  }

  return result;
};

console.log(solution());
