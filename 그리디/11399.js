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
    const withDrawTime = input[1];
    
    withDrawTime.sort((a, b) => a - b);
    
    let minTotalWithDrawTime = 0;
    for(let i = 0; i < N; i++){
      for(let j = 0; j <= i; j++){
        minTotalWithDrawTime += withDrawTime[j];
      }
    }
    
    console.log(minTotalWithDrawTime);
    process.exit();
})