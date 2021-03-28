const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {
    const N = input[0][0];

    let primeNumberCount = 0;
    for(let i = 0 ; i < N; i++){
      let isPrime = true;
      if(input[1][i] === 1){
        continue;
      }

      for(let j = 2; j < input[1][i]; j++){
        if(input[1][i] % j === 0){
          isPrime = false;
          break;
        }
      }

      if(isPrime) {
        primeNumberCount++;
      }

    }

    console.log(primeNumberCount);
    process.exit();
  })