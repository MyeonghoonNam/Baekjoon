const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const N = parseInt(line);
  let threeKgBag = 0;
  let fiveKgBag = 0;

  let sugarCount = N;

  while(true){
    if(sugarCount % 5 === 0){
      fiveKgBag = sugarCount / 5;
      console.log(threeKgBag + fiveKgBag);
      rl.close();
    } else if(sugarCount <= 0){
      console.log(-1);
      rl.close();
    }

    sugarCount = sugarCount - 3;
    threeKgBag++;
  }

  
})
  .on('close', () => {
    process.exit();
  })