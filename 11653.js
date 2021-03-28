const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  PrimeFactorization(parseInt(line));
  rl.close();
})
  .on('close', () => {
    process.exit();
  })

function PrimeFactorization(n){
  let divider = 2;

  while(n != 1){
    if(n % divider === 0){
      console.log(divider);
      n /= divider;
    } else {
      divider++
    }
  }
}