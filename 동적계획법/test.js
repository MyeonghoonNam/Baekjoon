// const input = ['4', '1 5 6 7'];
// const input = ['5', '10 9 8 7 6'];
// const input = ['10', '1 1 2 3 5 8 13 21 34 55'];
// const input = ['10', '5 10 11 12 13 30 35 40 45 47'];
// const input = ['4', '5 2 8 10'];
const input = ['4', '3 5 15 16'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());
  const cards = input.shift().split(' ').map(Number);
  cards.unshift(0);

  const dp = [0, cards[1]];
  for (let i = 2; i <= N; i++) {
    dp[i] = 0;

    for (let j = 1; j <= i; j++) {
      dp[i] = Math.max(dp[i], dp[i - j] + cards[j]);
    }
  }

  return dp[N];
}
