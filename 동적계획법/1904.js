const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const N = Number(line);

  const dp = [0, 1, 2];

  for(let i = 3; i <= N; i++){
    dp[i] = (dp[i-1] + dp[i-2]) % 15746;
  }

  console.log(dp[N]);

})
  .on('close', () => {
    process.exit();
  })