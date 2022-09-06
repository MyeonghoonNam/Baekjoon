const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
5
20 3 14 6 7 8 18 10 12 15`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const K = Number(input());
  const sensor = input().split(" ").map(Number);

  sensor.sort((a, b) => a - b);

  const diff = [];

  for (let i = 0; i < N - 1; i++) {
    const dist = Math.abs(sensor[i] - sensor[i + 1]);
    diff.push(dist);
  }

  diff.sort((a, b) => a - b);

  let result = 0;

  for (let i = 0; i < N - K; i++) {
    result += diff[i];
  }

  return result;
};

console.log(solution());
