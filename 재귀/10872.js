const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const result = Fatorial(parseInt(line));

  console.log(result);
  rl.close();
})
  .on('close', () => {
    process.exit();
  })

function Fatorial(n){
  if(n <= 1){
    
    return 1;
  }

  return n * Fatorial(n-1);
}