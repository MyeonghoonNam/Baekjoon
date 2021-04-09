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
    const N = input[0];
    const numbers = input[1]

    const dp = [];

    for(let i = 0; i < N; i++){
      dp[i] = 1;

      for(let j = 0; j < i; j++){
        if(numbers[i] > numbers[j] && dp[i] < dp[j] + 1){
          dp[i] = dp[j] + 1;
        }
      }
    }

    let maxLength = Math.max(...dp);

    console.log(maxLength);

    const result = [];
    for(let i = N - 1; i >= 0; i--){
      if(maxLength === dp[i]){
        result.push(numbers[i]);
        maxLength--;
      }
    }

    console.log(result.reverse().join(' '));

    process.exit();
  });