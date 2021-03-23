const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const alphaCount = [];

  for(let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++){
    alphaCount.push(line.indexOf(String.fromCharCode(i)));
  }

  console.log(alphaCount.join(' '));
})
  .on('close', () => {
    process.exit();
  })