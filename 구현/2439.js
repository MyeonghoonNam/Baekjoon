const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  let num = Number(line);

  let star = new Array(num).fill(' ');

  for (let i = num - 1; i >= 0; i--) {
    star[i] = '*';
  
    console.log(star.join('')); 
  }

  rl.close();
})
  .on('close', () => {
    process.exit();
  })