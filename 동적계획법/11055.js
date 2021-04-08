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

    const dp = Array.from(Array(N), () => Array(2));

    let max = 0;
    for(let i = 0; i < N; i++){
      
      dp[i][0] = numbers[i];
      dp[i][1] = numbers[i];

      for(let j = 0; j < i; j++){
        if(numbers[i] > numbers[j] && dp[i][1] < dp[j][1] + numbers[i]){
          dp[i][1] = dp[j][1] + numbers[i];
        }
      }
      
      max = max < dp[i][1] ? dp[i][1] : max;
    }

    console.log(max);
    process.exit();
  })