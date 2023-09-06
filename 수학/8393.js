const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const num = parseInt(line);

  console.log(num * (num + 1) / 2);

  rl.close();
})
  .on('close', () => {
    process.exit();
  })