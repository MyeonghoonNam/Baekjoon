const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const input = line.split(' ').map(el => BigInt(el));
  const result = input[0] + input[1];

  console.log(result.toString());
  rl.close();
})
  .on('close', () => {
    process.exit();
  })