const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const input = line.split(' ').map(el => parseInt(el));

  const A = input[0];
  const B = input[1];
  const V = input[2];

  const day = Math.ceil((V - B) / (A - B));

  console.log(day);

  rl.close();
})
  .on('close', () => {
    process.exit();
  })