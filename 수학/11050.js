// 이항계수 => 순서가 상관없는 조합론
// 파스칼의 법칙
// (N, K) => (N - 1, K - 1) + (N - 1, K);
// N === K, K === 0 => 1;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  // 동적계획법을 이용한 이항계수 알고리즘

  const input = line.split(' ').map((el) => parseInt(el));
  const N = input[0];
  const K = input[1];
  const dp = Array.from(new Array(N + 1), () => new Array(K + 1).fill(0));

  // N === K => 1
  for (let i = 0; i <= K; i++) {
    dp[i][i] = 1;
  }

  // K === 0 => 1
  for (let i = 0; i <= N; i++) {
    dp[i][0] = 1;
  }

  for (let i = 2; i <= N; i++) {
    for (let j = 1; j <= K; j++) {
      dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
    }
  }

  console.log(dp[N][K]);
}).on('close', () => {
  process.exit();
});

// 재귀를 이용한 이항계수 알고리즘
// const input = [5, 2];
// const N = input[0];
// const K = input[1];

// console.log(BC(N, K));

// function BC(n, k) {
//   if (k === 0 || n === k) {
//     return 1;
//   } else {
//     return BC(n - 1, k - 1) + BC(n - 1, k);
//   }
// }
