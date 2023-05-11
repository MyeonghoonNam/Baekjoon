const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
2 3
2 5
2 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const balls = [];

  for (let i = 0; i < N; i++) {
    const [C, S] = input().split(" ").map(Number);
    balls.push([C, S, i]);
  }

  balls.sort((a, b) => a[1] - b[1]);

  let sum = 0;
  const colorSum = new Array(200001).fill(0);
  const result = new Array(N).fill(0);

  let start = 0;
  while (start < N) {
    let end = start;

    while (end < N && balls[start][1] === balls[end][1]) {
      end += 1;
    }

    for (let i = start; i < end; i++) {
      result[balls[i][2]] = sum - colorSum[balls[i][0]];
    }

    for (let i = start; i < end; i++) {
      colorSum[balls[i][0]] += balls[i][1];
      sum += balls[i][1];
    }

    start = end;
  }

  return result.join("\n");
};

console.log(solution());
