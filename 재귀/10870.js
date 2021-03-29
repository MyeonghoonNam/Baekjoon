const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const result = Fibonacci(parseInt(line));

  console.log(result);

  rl.close();
})
  .on('close', () => {
    process.exit();
  })

function Fibonacci(n){
  if([0, 1].includes(n)){
    return n;
  }

  return Fibonacci(n-2) + Fibonacci(n-1);
}