const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {
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
    process.exit();
})

