const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
// let lineCount = 0;

rl.on('line', line => {
  // lineCount++;
  input.push(line.split(' '));

  // if(lineCount >= 6){
    
  //   rl.close();
  // }

})
  .on('close', () => {
    const count = parseInt(input[0]);

    let result = '';
    for(let i = 1; i <= count ; i++){
      const num1 = parseInt(input[i][0]);
      const num2 = parseInt(input[i][1]);

      result += `Case #${i}: ${num1} + ${num2} = ${num1 + num2}\n`;
    }

    console.log(result);

    process.exit();
  });