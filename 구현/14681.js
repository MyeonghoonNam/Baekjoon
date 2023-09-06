const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  outpup:process.stdout
})

let input = [];
let count = 0;

rl.on('line', line => {
  count ++;

  input.push(line);

  if(count >= 2){
    rl.close();
  }
})
  .on('close', () => {
    if(input[0] > 0 && input[1] > 0){
      console.log(1);
    } else if(input[0] < 0 && input[1] > 0){
      console.log(2);
    } else if(input[0] < 0 && input[1] < 0){
      console.log(3);
    } else {
      console.log(4);
    }

    process.exit();
  })