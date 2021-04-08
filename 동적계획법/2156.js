const readline = require("readline");

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on("line", line => {
  input.push(parseInt(line));
})
  .on("close", () => {

    const N = input[0];
    input[0] = 0;
    
    const dp = [];

    dp[0] = 0;
    dp[1] = input[1];
    
    if(N > 1){
      dp[2] = input[1] + input[2];
    }

    for(let i = 3; i <= N; i++){
      dp[i] = Math.max(dp[i-1], Math.max(dp[i-3] + input[i] + input[i-1], dp[i-2] + input[i]));
    }

    console.log(dp[N]);
    process.exit();
  })