const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

let input = [];

rl.on('line', line => {
  input = line.split(' ').map(el => Number(el));
  rl.close();
})
  .on('close', () => {
    if(input[0] > input[1]){
      console.log('>');
    } else if(input[0] < input[1]){
      console.log('<');
    } else {
      console.log('==');
    }

    process.exit();
  })