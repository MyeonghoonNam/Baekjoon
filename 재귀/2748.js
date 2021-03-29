const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const result = Fibonacci(parseInt(line));

  console.log(result.toString());

})
  .on('close', () => {
    process.exit();
  })

const memoization = [0n, 1n];
function Fibonacci(n){

  for(let i = 2; i <= n; i++){
    memoization[i] = BigInt(memoization[i - 2] + memoization[i - 1]);
  }

  return memoization[n];
}