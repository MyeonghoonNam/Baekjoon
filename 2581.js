const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(parseInt(line));
})
  .on('close', () => {
    const min = input[0];
    const max = input[1];
    const primeNumbers = [];

    let sum = 0;
    for(let i = min; i <= max; i++){
      let  isPrime = true

      if(i === 1){
        continue;
      }

      for(let j = 2; j < i; j++){
        if(i % j === 0){
          isPrime = false;
          break;
        }
      }

      if(isPrime){
        sum += i;
        primeNumbers.push(i);
      }
    }

    if(primeNumbers.length){
      console.log(sum);
      console.log(Math.min(...primeNumbers));
    } else{
      console.log(-1);
    }

    process.exit();
  })