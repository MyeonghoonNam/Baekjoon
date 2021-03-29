const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const result = Fibonacci(BigInt(line));

  console.log(result.toString());
})
  .on('close', () => {
    process.exit();
  })

const memoization = [0n, 1n];
function Fibonacci(n){

  const mod = 1000000n;
  const pisano = mod/10n*15n;

  for(let i = 2; i < pisano; i++){
    memoization[i] = BigInt(memoization[i-2] + memoization[i-1]);
    memoization[i] %= mod;
  }

  return memoization[n % pisano];
}

// 피사노 주기 : 모듈러가 10^k(k > 2)일 때 15 * 10^k-1