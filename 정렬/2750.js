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
    const T = input[0];
    const numbers = input.slice(1);

    numbers.sort((a, b) => a - b);
    for(let i = 0; i < T; i++){
      console.log(numbers[i]);
    }
    
    process.exit();
  })