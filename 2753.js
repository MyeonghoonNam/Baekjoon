const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

rl.on('line', line => {
  
  if(line % 400 == 0 || line % 4 == 0 && line % 100 != 0){
    console.log(1);
  } else {
    console.log(0);
  }

  rl.close();
})
  .on('close', () => {
    process.exit();
  })
