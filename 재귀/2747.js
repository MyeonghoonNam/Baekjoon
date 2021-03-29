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

const memoization = [];
function Fibonacci(n){
  memoization[0] = 0;
  memoization[1] = 1;


  for(let i = 2; i <= n; i++){
    memoization[i] = memoization[i - 2] + memoization[i - 1];
  }

  return memoization[n];
}