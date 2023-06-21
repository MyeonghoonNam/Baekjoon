const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 4200
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

// 2차 해결
const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const coins = [];
  let remain = K;
  let result = 0;

  for (let i = 0; i < N; i++) {
    const coin = Number(input());

    if (coin <= K) {
      coins.push(coin);
    }
  }

  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    const count = parseInt(remain / coin);

    remain %= coin;
    result += count;
  }

  return result;
};

console.log(solution());

// 1차 해결
// const solution = () => {
//   let [N, K] = input().split(" ").map(Number);
//   const coins = [];
//   let result = 0;

//   for (let i = 0; i < N; i++) {
//     coins.push(Number(input()));
//   }

//   for (let i = N - 1; i >= 0; i--) {
//     const coin = coins[i];

//     result += parseInt(K / coin);
//     K %= coins[i];
//   }

//   return result;
// };

// console.log(solution());
