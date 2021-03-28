const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const input = line.split(' ').map(el => parseInt(el));
  primeFind(input[0], input[1]);
  rl.close();
})
  .on('close', () => {
    process.exit();
  })

function primeFind(min, max){

  let isPrimeArr = new Array(max + 1);
  isPrimeArr.fill(true);
  isPrimeArr[1] = false;

  for(let i = 2; i <= max; i++){
    for(j = 2; i * j <= max; j++){
      isPrimeArr[i * j] = false;
    }
  }

  for(let i = min; i <= max; i++){
    if(isPrimeArr[i]){
      console.log(i);
    }
  }


}