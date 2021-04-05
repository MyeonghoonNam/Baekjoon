const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(Number(line));
})
  .on('close', () => {
    const T = input[0];
    const numbers = input.slice(1);
    
    let result = '';
    for(let i = 0; i < T; i++){
      const dp = [0, 1, 1];

      for(let j = 3; j <= numbers[i]; j++){
        dp[j] = dp[j-2] + dp[j-3];
      }
      
      result += `${dp[numbers[i]]}\n`;
    }

    console.log(result);
    process.exit();
  })