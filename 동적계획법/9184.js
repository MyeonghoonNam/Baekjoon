const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];

rl.on('line', line => {
  if(line === '-1 -1 -1'){
    rl.close();
  }

  input.push(line.split(' ').map(el => Number(el)));
})
  .on('close', () => {
    const dp = new Array(21);
    for(let i = 0; i < 21; i++){
      dp[i] = new Array(21);
      for(let j = 0; j < 21; j++){
        dp[i][j] = new Array(21).fill(0);
      }
    }
    
    let result = '';
    for(let i = 0; i < input.length; i++){
      let [a, b, c] = input[i];

      result += `w(${a}, ${b}, ${c}) = ${w(a,b,c)}\n`;

    }
    
    console.log(result);
    process.exit();

    function w(a, b, c){

      if(a <= 0 || b <= 0 || c <= 0){

        return 1;

      } 

      if(a > 20 || b > 20 || c > 20){

        return w(20, 20, 20);

      } 

      if(dp[a][b][c] !== 0){

        return dp[a][b][c];

      } 

      if(a < b && b < c){

        let d1 = dp[a][b][c - 1] = w(a, b, c - 1);
        let d2 = dp[a][b - 1][c - 1] = w(a, b - 1, c - 1);
        let d3 = dp[a][b - 1][c] = w(a, b - 1, c);

        return dp[a][b][c] = d1 + d2 - d3;

      } 
      
      let d1 = dp[a - 1][b][c] = w(a - 1, b, c);
      let d2 = dp[a - 1][b - 1][c] = w(a - 1, b - 1, c);
      let d3 = dp[a - 1][b][c - 1] = w(a - 1, b, c - 1);
      let d4 = dp[a - 1][b - 1][c - 1] = w(a - 1, b - 1, c - 1);

      return dp[a][b][c] = d1 + d2 + d3 - d4;
    }
  })