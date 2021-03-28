const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(parseInt(line));
})
  .on('close', () => {
    Partition(input);
    process.exit();
  })

function Partition(input){
  const T = input[0];
  input.splice(0, 1);

  for(let i = 0; i < T; i++){
    const primeNumArr = getPrime(input[i]);

    let firstPartition = input[i] / 2;
    let secondPartition = input[i] / 2;
    while(true){

      if(primeNumArr[firstPartition] && primeNumArr[secondPartition]){
        console.log(`${firstPartition} ${secondPartition}`);
        break;
      } else{
        firstPartition--;
        secondPartition++;
      }
    }
  }
}

function getPrime(num){
  const isPrimeArr = new Array(num);

  isPrimeArr.fill(true);
  isPrimeArr[0] = isPrimeArr[1] = false;

  for(let i = 2; i <= num; i++){
    if(Math.pow(i, 2) > num){
      break;
    } else{

      for(let j = i * i; j <= num; j += i){
        isPrimeArr[j] = false;
      }
    }
  }
  
  return isPrimeArr;
}