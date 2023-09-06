const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  let ascii = line.charCodeAt(0);
  console.log(ascii);
  
  rl.close();
})
  .on('close', () => {
    process.exit();
  })