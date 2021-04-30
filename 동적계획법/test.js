// const input = ['10', '10 -4 3 1 5 6 -35 12 21 -1'];
// const input = ['10', '2 1 -4 3 4 -4 6 5 -5 1'];
const input = ['5', '-1 -2 -3 -4 -5'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());
  const arr = input.shift().split(' ').map(Number);

  const dp = [arr[0]];
  for (let i = 1; i < N; i++) {
    dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
  }

  const result = Math.max(...dp);

  return result;
}
