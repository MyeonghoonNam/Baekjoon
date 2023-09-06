const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const count = line;

  let result = '';
  for(let i = 1 ; i <= count ; i++){
    result += '*'
    console.log(result);
  }
  
  rl.close();
})
  .on('close', () => {
    process.exit();
  })