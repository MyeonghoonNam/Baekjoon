const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  let numbers = line.split(' ');

  for(let i = 0; i < numbers.length; i++){
    numbers[i] = numbers[i].split('').reverse().join('');
  }
  
  let bigNum = Math.max(...numbers);

  console.log(bigNum);
  
})
  .on('close', () => {
    process.exit();
  })