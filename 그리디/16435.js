const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 10
10 11 13`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, L] = input().split(" ").map(Number);
  const fruit = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  let snake = L;

  for (let i = 0; i < N; i++) {
    const height = fruit[i];

    if (snake >= height) {
      snake++;
    }
  }

  const result = snake;

  return result;
};

console.log(solution());
