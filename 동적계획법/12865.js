const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 7
6 13
4 8
3 6
5 12`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const DP = new Array(K + 1).fill(0);
  const products = [{}];

  for (let i = 0; i < N; i += 1) {
    const [W, V] = input().split(" ").map(Number);
    products.push({ weight: W, value: V });
  }

  for (let i = 1; i <= N; i += 1) {
    const { weight, value } = products[i];

    for (let j = K; j - weight >= 0; j -= 1) {
      DP[j] = Math.max(DP[j], DP[j - weight] + value);
    }
  }

  return DP[K];
};

console.log(solution());
