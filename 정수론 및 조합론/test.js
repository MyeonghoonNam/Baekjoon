const input = [1000, 999];

const N = input[0];
const K = input[1];

const dp = Array.from(new Array(N + 1), () => new Array(K + 1).fill(0));

for (let i = 0; i <= K; i++) {
  dp[i][i] = 1;
}

for (let i = 0; i <= N; i++) {
  dp[i][0] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 1; j <= K; j++) {
    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007;
  }
}

console.log(dp[N][K]);
