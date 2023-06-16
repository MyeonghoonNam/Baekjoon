const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const DP = Array.from(new Array(N + 1), () => new Array(10).fill(0));

  // i자리 수의 마지막 숫자가 j인 경우
  // 0과 9는 예외처리 필요
  // DP[i][j] = DP[i-1][j-1] + DP[i-1][j+1]

  DP[1][0] = 0;

  for (let i = 1; i <= 9; i++) {
    DP[1][i] = 1;
  }

  for (let i = 2; i <= N; i++) {
    for (let j = 0; j <= 9; j++) {
      if (j === 0) {
        DP[i][0] = DP[i - 1][1];
      } else if (j >= 1 && j <= 8) {
        // 1 ~ 8
        DP[i][j] = DP[i - 1][j - 1] + DP[i - 1][j + 1];
      } else {
        // 9
        DP[i][9] = DP[i - 1][8];
      }

      DP[i][j] %= Number(1e9);
    }
  }

  let result = 0;

  for (let i = 0; i <= 9; i++) {
    result += DP[N][i];
    result %= Number(1e9);
  }

  return result;
};

console.log(solution());
