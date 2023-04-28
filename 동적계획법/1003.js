const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
6
22`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const N = Number(input());
    const DP = new Array(N + 1).fill(0);

    DP[0] = 0;
    DP[1] = 1;

    for (let i = 2; i <= N; i++) {
      DP[i] = DP[i - 1] + DP[i - 2];
    }

    if (N === 0) {
      result.push("1 0");
    } else {
      result.push(`${DP[N - 1]} ${DP[N]}`);
    }
  }

  return result.join("\n");
};

// const solution = () => {
//   const result = [];
//   let T = Number(input());

//   while (T--) {
//     const N = Number(input());
//     const MAX_NUMBER = 41;
//     const DP = Array.from(new Array(MAX_NUMBER), () => new Array(2));

//     DP[0][0] = 1;
//     DP[0][1] = 0;
//     DP[1][0] = 0;
//     DP[1][1] = 1;

//     for (let i = 2; i <= N; i++) {
//       for (let j = 0; j < 2; j++) {
//         DP[i][j] = DP[i - 2][j] + DP[i - 1][j];
//       }
//     }

//     result.push(`${DP[N][0]} ${DP[N][1]}`);
//   }

//   return result.join("\n");
// };

console.log(solution());
