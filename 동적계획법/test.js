const input = ['3', '4', '7', '10'];

const dp = Array.from(new Array(100001), () => new Array(4).fill(0));

dp[1][1] = 1;
dp[2][2] = 1;

dp[3][1] = 1;
dp[3][2] = 1;
dp[3][3] = 1;

const T = Number(input[0]);

for (let j = 4; j < 100001; j++) {
  dp[j][1] = (dp[j - 1][2] + dp[j - 1][3]) % 1000000009;
  dp[j][2] = (dp[j - 2][1] + dp[j - 2][3]) % 1000000009;
  dp[j][3] = (dp[j - 3][1] + dp[j - 3][2]) % 1000000009;
}

let result = '';
for (let i = 1; i < T + 1; i++) {
  const N = Number(input[i]);

  const sum = (dp[N][1] + dp[N][2] + dp[N][3]) % 1000000009;

  result += `${sum}\n`;
}

console.log(result);
