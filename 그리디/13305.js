const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
2 3 1
5 2 4 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const dist = input().split(" ").map(Number);
  const cost = input().split(" ").map(Number);
  let minCost = cost[0];

  for (let i = 0; i < N; i++) {
    minCost = Math.min(minCost, cost[i]);
    cost[i] = minCost;
  }

  let result = 0n;
  for (let i = 0; i < N - 1; i++) {
    result += BigInt(dist[i]) * BigInt(cost[i]);
  }

  return String(result);
};

console.log(solution());
