const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const str = line.split('').sort((a, b) => b - a).join('');
  console.log(str);
})
  .on('close', () => {
    process.exit();
  })