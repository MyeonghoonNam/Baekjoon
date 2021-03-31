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
    const M = input[0][1];
    const numArray = input[1];

    let Max = 0;
    for(let i = 0; i < N - 2; i++){
      for(let j = i + 1; j < N - 1; j++){
        for(let k = j + 1; k < N; k++){
          let sum = numArray[i] + numArray[j] + numArray[k];

          if(sum > Max && sum <= M){
            Max = sum;
          }
        }
      }
  
    }

    console.log(Max);

    process.exit();
  })