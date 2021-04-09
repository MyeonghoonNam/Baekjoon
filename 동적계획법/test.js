const input = ["6","10 20 10 30 20 50"];

const N = input[0];
const numbers = input[1].split(' ').map(el => parseInt(el));

const dp = [];
let maxLength = 0;
for(let i = 0; i < N; i++){
  dp[i] = 1;

  for(let j = 0; j < i; j++){
    if(numbers[i] > numbers[j] && dp[i] < dp[j] + 1){
      dp[i] = dp[j] + 1;
      maxLength = Math.max(dp[i], maxLength);
    }
  }
}

const result = [];
for(let i = N - 1; i >= 0; i--){
  if(maxLength === dp[i]){
    result.push(numbers[i]);
    maxLength--;
  }
}

console.log(result.length);
console.log(result.reverse().join(' '));
