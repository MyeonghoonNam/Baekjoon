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
    
    const dp = [[1, 0], [0, 1]]; 
    
    let result = '';
    for(let i = 0; i < T; i++){
      fibonaci(numbers[i]);
      result += `${dp[numbers[i]][0]} ${dp[numbers[i]][1]}\n`;
    }

    function fibonaci(num){
      if(dp[num] == null || dp[num] == null){
        dp[num] = [fibonaci(num-1)[0] + fibonaci(num-2)[0]];
        dp[num][1] = fibonaci(num-1)[1] + fibonaci(num-2)[1];
      }

      return dp[num];
    }

    console.log(result);
    process.exit();
  })