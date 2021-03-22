const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let lineCount = 0;

rl.on('line', function (line) {
  lineCount ++;
  input.push(line);

  if(lineCount >= 6){
    rl.close();
  }
}).on('close', function () {
  let count = Number(input[0]);	
  let numbers = [];

  for (let i = 1; i <= count; i++) {
    numbers.push(input[i].split(' '));
  }

  for (let i = 0; i < count; i++) {
    num1 = Number(numbers[i][0]);
    num2 = Number(numbers[i][1]);

    console.log(num1 + num2);
  }
	
  process.exit();
});