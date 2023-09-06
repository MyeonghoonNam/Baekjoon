const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  if(line === '0'){
    rl.close();
  }

  input.push(parseInt(line));
})
  .on('close', () => {
    for(let num of input){
      const min = num + 1;
      const max = 2 * num;
      const isPrimeNumArr = new Array(max + 1);
      let primeNumCounter = 0;

      isPrimeNumArr.fill(true);
      isPrimeNumArr[0] = isPrimeNumArr[1] = false;

      for(let i = 2; i <= max; i++){
        if(Math.pow(i, 2) > max){
          break;
        } else{
          for(let j = Math.pow(i, 2); j <= max; j += i){
            isPrimeNumArr[j] = false;
          }
        }
      }

      for(let i = min; i <= max; i++){
        if(isPrimeNumArr[i]){
          primeNumCounter++;
        }
      }

      console.log(primeNumCounter);
    }
    process.exit();
  })