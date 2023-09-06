const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const N = parseInt(line);

  let numberMax = 1;
  let count = 1;

  while(numberMax < N){
    numberMax += count * 6;
    count++;
  }

  console.log(count);

  rl.close();
})
  .on('close', () => {
    process.exit();
  })