const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line.split(' '));
})
  .on('close', () => {
    let count = 0;
    while(input[count]){
      const num1 = parseInt(input[count][0]);
      const num2 = parseInt(input[count][1]);

      console.log(num1 + num2);
      count++;
    }

    process.exit();
  })