const input = ['6', '6', '10', '13', '9', '8', '1'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());
  const arr = [0];
  for (let i = 0; i < N; i++) {
    const num = Number(input.shift());
    arr.push(num);
  }

  const dp = [0];
  dp[1] = arr[1];
  dp[2] = dp[1] + arr[2];
  for (let i = 3; i <= N; i++) {
    dp[i] = Math.max(
      dp[i - 1],
      dp[i - 2] + arr[i],
      dp[i - 3] + arr[i - 1] + arr[i]
    );
  }

  return dp[N];
}
