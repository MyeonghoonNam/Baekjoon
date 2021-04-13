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
    const tmp = input[0].split(' ').map(el => Number(el));

    const N = tmp[0];
    const K = tmp[1];
    const coins = input.slice(1).map(el => Number(el));
    
    coins.sort((a, b) => b - a);

    solve(N, K, coins);
    process.exit();
    
    function solve(N, K, coins){
      let count = 0;
    
      for(let el of coins){
        if(K === 0){
          break;
        }
    
        if(el <= K){
          count += parseInt(K / el);
          K = K % el;
        }
      }
    
      console.log(count);
    }
})