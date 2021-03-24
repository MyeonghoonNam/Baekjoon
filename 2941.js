const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const regex = /c\=|c\-|dz\=|d\-|lj|nj|s\=|z\=/g;
  const result = line.replace(regex, ' ');

  console.log(result.length);
})
  .on('close', () => {
    process.exit();
  }) 