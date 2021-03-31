const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  let N = parseInt(line);
  let theNumberAtTheEnd = 665;
  while(N > 0){
    theNumberAtTheEnd++;

    if(theNumberAtTheEnd.toString().includes('666')){
      N--;
    }
  }

  console.log(theNumberAtTheEnd);
  rl.close();
})
  .on('close', () => {
    process.exit();
  })