const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
let count = 0;

rl.on('line', line => {
  count ++
  
  input.push(line);

  if(count >= 2) {
    rl.close();
  }
})
  .on('close', () => {
    const num1 = Number(input[0]);
    const num2 = Number(input[1]);

    const firstNum = num2 % 10;
    const secondNum = Math.floor((num2 % 100) / 10);
    const thirdNum = Math.floor(num2 / 100);

    console.log(num1 * firstNum);
    console.log(num1 * secondNum);
    console.log(num1 * thirdNum);
    console.log(num1 * num2);

    process.exit();

  })