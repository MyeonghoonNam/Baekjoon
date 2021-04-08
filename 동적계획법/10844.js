const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const N = parseInt(line);
  const dp = Array.from(new Array(101), () => new Array(11).fill(0));

  for(let i = 1; i <= 9; i++){
    dp[1][i] = 1;
  }

  for(let i = 2; i <= N; i++){
    dp[i][0] = dp[i-1][1];

    for(let j = 1; j <= 9; j++){
      dp[i][j] = (dp[i-1][j-1] + dp[i-1][j+1]) % 1000000000;
    }
  }

  let sum = 0;
  for(let i = 0; i < 10; i++){
    sum += dp[N][i];
  }

  console.log(sum % 1000000000);
})
  .on('close', () => {
    process.exit();
  })