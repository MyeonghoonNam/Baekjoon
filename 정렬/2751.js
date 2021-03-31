const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(parseInt(line));
})
  .on('close', () => {
    const T = input[0];
    const numbers = input.slice(1);

    let result = '';

    numbers.sort((a, b) => {
      return a - b;
    });

    numbers.forEach(num => {
      result += `${num}\n`;
    })

    console.log(result);
    process.exit();
  })