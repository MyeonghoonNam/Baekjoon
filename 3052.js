const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
let numCount = []
rl.on('line', line => {
  input.push(parseInt(line));
})
  .on('close', () => {
    for(let i = 0 ; i < input.length ; i++){
      numCount.push(input[i] % 42);
    }

    numCount = new Set(numCount);

    console.log(numCount.size);

    process.exit();
  })