const input = ['6', '10 20 10 30 20 50'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());
  const arr = input.shift().split(' ').map(Number);

  const dp = [];
  for (let i = 0; i < N; i++) {
    dp[i] = 1;

    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
      }
    }
  }

  const result = Math.max(...dp);

  return result;
}
