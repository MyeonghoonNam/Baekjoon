const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => Number(el)));
})
  .on('close', () => {
    const N = input[0][0];
    const numbers = input.slice(1)[0];
    let sortNumbers = Array.from(new Set(numbers));

    sortNumbers.sort((a, b) => a - b);
    
    let result = '';
    for(let i = 0; i < N; i++){
      result += `${sortNumbers.indexOf(numbers[i])} `;
    }

    console.log(result);
    process.exit();
  })