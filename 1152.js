const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const wordArray = line.trim().split(' ');

  if(wordArray[0] === ''){
    console.log(0);
  } else {
    console.log(wordArray.length);
  }
})
  .on('close', () => {
    process.exit();
  })