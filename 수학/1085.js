const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const input = line.split(' ').map(el => parseInt(el));

  const x = input[0];
  const y = input[1];
  const w = input[2];
  const h = input[3];

  const distance = [x, y, h-y, w-x];
  const result = Math.min(...distance);

  console.log(result);
  rl.close();
})
  .on('close', () => {
    process.exit();
  })