const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(line);
})
  .on('close', () => {
    const str1 = input[0];
    const str2 = input[1];
    
    const dp = Array.from(Array(str1.length + 1), () => 
      Array(str2.length + 1).fill(0)
    );
    
    for(let i = 1; i <= str1.length; i++){
      for(let j = 1; j <= str2.length; j++){
    
        if(str1[i-1] === str2[j-1]){
          dp[i][j] = dp[i-1][j-1] + 1;
          
        } else {
    
          dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
        }
      }
    }
    
    console.log(dp[str1.length][str2.length]);
    process.exit();
})
