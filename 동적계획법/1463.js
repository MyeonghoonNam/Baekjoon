const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let dp = [0, 0, 1, 1];
rl.on('line', line => {
  const N = parseInt(line);

  for(let i = 3; i <= N; i++){
    dp[i] = dp[i-1] + 1;

    if(i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    }

    if(i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    }
  }

  console.log(dp[N]);
})
  .on('close', () => {
    process.exit();
  })