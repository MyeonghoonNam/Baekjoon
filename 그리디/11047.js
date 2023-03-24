const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 4790
1
5
10
50
100
500
1000
5000
10000
50000`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [N, K] = input().split(" ").map(Number);
  const coins = [];
  let result = 0;

  for (let i = 0; i < N; i++) {
    coins.push(Number(input()));
  }

  for (let i = N - 1; i >= 0; i--) {
    const coin = coins[i];

    result += parseInt(K / coin);
    K %= coins[i];
  }

  return result;
};

console.log(solution());
