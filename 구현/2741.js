const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

let answer = '';

rl.on('line', line => {
  const num = line;

  for(let i = 1 ; i <= num ; i++){
    answer += i + "\n";
  }

  console.log(answer);

  rl.close();
})
  .on('close', () => {
    process.exit();
  })