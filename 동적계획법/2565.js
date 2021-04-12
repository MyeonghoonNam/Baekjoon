const readline = require("readline");

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on("line", line => {
  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on("close", () => {
    const N = input[0][0];
    const electricWire = input.slice(1);
    const dp = [];

    electricWire.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    for(let i = 0; i < N; i++){
      dp[i] = 1;

      for(let j = 0; j < i; j++){

        if(electricWire[i][1] > electricWire[j][1]){
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }

    let max = Math.max(...dp);

    console.log(N - max);
    process.exit();
});