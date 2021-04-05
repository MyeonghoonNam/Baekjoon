const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => Number(el)));
})
  .on('close', () => {
    const N = input[0][0];
    const cost = input.slice(1);

    const dp = new Array(N)
    
    for(let i = 0; i < N; i++){
      dp[i] = [0, 0, 0];
    }
    
    dp[0] = cost[0];
    
    for(let i = 1; i < N; i++){
      dp[i][0] = Math.min(dp[i-1][1], dp[i-1][2]) + cost[i][0];
      dp[i][1] = Math.min(dp[i-1][0], dp[i-1][2]) + cost[i][1];
      dp[i][2] = Math.min(dp[i-1][0], dp[i-1][1]) + cost[i][2];
    }
    
    console.log(Math.min(...dp[N-1]));

    process.exit();
  })