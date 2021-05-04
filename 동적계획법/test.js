const input = ['10', '1 100 2 50 60 3 5 6 7 8'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());
  const numbers = input.shift().split(' ').map(Number);

  const dp = [];
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    dp[i] = numbers[i];

    for (let j = 0; j < i; j++) {
      if (numbers[i] > numbers[j] && dp[i] < dp[j] + numbers[i]) {
        dp[i] = dp[j] + numbers[i];
      }
    }

    max = max < dp[i] ? dp[i] : max;
  }

  return max;
}
