const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
2 1 1 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const count = input().split(" ").map(Number);
  const result = new Array(N).fill(0);

  for (let i = 0; i < N; i++) {
    let leftPeopleCount = count[i];

    for (let j = 0; j < N; j++) {
      if (leftPeopleCount === 0 && result[j] === 0) {
        result[j] = i + 1;
        break;
      } else if (result[j] === 0) {
        leftPeopleCount--;
      }
    }
  }

  return result.join(" ");
};

console.log(solution());
