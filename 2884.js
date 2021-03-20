const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdiout
});

let input = [];

rl.on('line', line => {
  input = line.split(' ').map(el => parseInt(el));

  rl.close();
})
  .on('close', () => {
    if(input[1] - 45 < 0){
      input[0] -= 1;

      if(input[0] < 0){
        input[0] += 24;
      }

      input[1] = 60 + input[1] - 45;
    } else {
      input[1] -= 45;
    }

    console.log(`${input[0]} ${input[1]}`);

    process.exit();
  })