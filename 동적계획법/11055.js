const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 구현
  console.log(Solution(input));

  function Solution(input) {
    const N = Number(input[0]);
    const numbers = input[1].split(' ').map(Number);

    const LIS_DP = [];
    const LDS_DP = [];

    for (let i = 0; i < N; i++) {
      LIS_DP[i] = 1;
      for (let j = 0; j < i; j++) {
        if (numbers[i] > numbers[j] && LIS_DP[i] < LIS_DP[j] + 1) {
          LIS_DP[i] = LIS_DP[j] + 1;
        }
      }
    }

    for (let i = N - 1; i >= 0; i--) {
      LDS_DP[i] = 1;
      for (let j = N - 1; j > i; j--) {
        if (numbers[i] > numbers[j] && LDS_DP[i] < LDS_DP[j] + 1) {
          LDS_DP[i] = LDS_DP[j] + 1;
        }
      }
    }

    let max = 0;
    for (let i = 0; i < N; i++) {
      if (max < LIS_DP[i] + LDS_DP[i]) {
        max = LIS_DP[i] + LDS_DP[i];
      }
    }

    return max - 1;
  }
});
