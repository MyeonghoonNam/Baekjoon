const input = [[4,7], [6, 13], [4, 8], [3, 6], [5, 12]];

const N = input[0][0];
const K = input[0][1];

const products = input.slice(1);
products.unshift("0");
    
const dp = new Array(K+1).fill(0);


for(let i = 1; i <= N; i++){
    
  for(let j = K; j - products[i][0] >= 0; j--){
    dp[j] = Math.max(dp[j], dp[j - products[i][0]] + products[i][1]);
  }
}
    
console.log(dp[K]);
