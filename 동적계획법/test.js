// const input = [[10], [10,-4,3,1,5,6,-35,12,21,-1]];
// const input = [[10], [2,1,-4,3,4,-4,6,5,-5,1]];
const input = [[5], [-1,-2,-3,-4,-5]];

const N = input[0][0];
const numbers = input[1];

const dp = [numbers[0]];
let max = numbers[0];
for(let i = 1; i < N; i++){
  
  dp[i] = Math.max(dp[i-1] + numbers[i], numbers[i]);

  max = Math.max(max, dp[i]);

}

console.log(max);