const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' '));
}).on('close', () => {
  const testcase = parseInt(input[0]);

  let result = '';
  for(let t=1; t<=testcase; t++){
    const A = parseInt(input[t][0]);
    const B = parseInt(input[t][1]);

    result += `Case #${t}: ${A+B}\n`;
  }
  console.log(result);
  process.exit();
});