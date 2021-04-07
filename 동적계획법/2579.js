const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(parseInt(line));
})
  .on('close', () => {

    const N = input[0];
    const score = input.slice(1);

    const dp = new Array(301);

    dp[0] = score[0];
    dp[1] = Math.max(score[0] + score[1], score[1]);
    dp[2] = Math.max(score[0] + score[2], score[1] + score[2]);

    for(let i = 3; i < N; i++){
      dp[i] = Math.max(dp[i-2] + score[i], dp[i-3] + score[i-1] + score[i]);
    }

    console.log(dp[N-1]);

    process.exit();
  })