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

  const result = [];
  let max = Math.max(...dp);
  result[0] = max;

  let path = [];
  for (let i = N - 1; i >= 0; i--) {
    if (dp[i] === max) {
      path.push(arr[i]);
      max--;
    }
  }

  result[1] = path.reverse();

  const print = `${result[0]}\n${result[1].join(' ')}`;

  return print;
}
