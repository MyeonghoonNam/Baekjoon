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
    const numbers = input[1];
    
    const dp = [numbers[0]];
    let max = numbers[0];
    for(let i = 1; i < N; i++){
      
      dp[i] = Math.max(dp[i-1] + numbers[i], numbers[i]);
    
      max = Math.max(max, dp[i]);
    
    }
    
    console.log(max);
    process.exit();
})