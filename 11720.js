const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line);
})
  .on('close', () => {
    const numArray = input[1];
    
    const sum = Array.from(numArray).reduce((acc, cur) => {
      return parseInt(acc) + parseInt(cur);
    })

    console.log(sum);
    process.exit();
  })