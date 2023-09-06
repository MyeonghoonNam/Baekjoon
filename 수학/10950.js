const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
let lineCount = 0;

rl.on('line', line => {
  lineCount ++;
  input.push(line.split(' '));

  if(lineCount >= 6){
    const count = parseInt(input[0]);

    for(let i = 1 ; i <= count ; i++){
      const num1 = parseInt(input[i][0]);
      const num2 = parseInt(input[i][1]);

      console.log(num1 + num2);
    }
    
    rl.close();
  }
})
  .on('close', () => {
    process.exit();
  })