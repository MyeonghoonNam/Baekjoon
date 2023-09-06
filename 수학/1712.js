const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const input = line.split(' ').map(el => parseInt(el));

  const fixedCost = input[0];
  const variableCost = input[1];
  const price = input[2];
  let numProduct = 0;

  if(variableCost >= price){
    console.log(-1);
  } else{
    numProduct = Math.floor(fixedCost / (price - variableCost)) + 1;

    console.log(numProduct)
  }
  
  rl.close();
})
  .on('close', () => {
    process.exit();
  })