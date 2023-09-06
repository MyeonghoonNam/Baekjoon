const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  let Num = parseInt(line);

  if(Num >= 90){
    console.log('A');
  } else if(Num >= 80){
    console.log('B');
  } else if(Num >= 70){
    console.log('C');
  } else if(Num >= 60){
    console.log('D');
  } else {
    console.log('F');
  }

  rl.close();
})
  .on('close', () => {
    process.exit();
  })