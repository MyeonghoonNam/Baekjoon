const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  hansooCheck(parseInt(line));
  rl.close();
})
  .on('close', () => {
    process.exit();
  });

function hansooCheck(n) {
  let countHansoo = 0;

  for(let i = 1; i <= n; i++){

    if(i < 100) {
      countHansoo++;
    } else if(i < 1000){
      const firstNum = i % 10;
      const secondNum = parseInt((i % 100) / 10);
      const thirdNum = parseInt(i / 100);
  
      if(thirdNum - secondNum === secondNum - firstNum){
        countHansoo++;
      }
    } else {
  
      break;
    }
  }

  console.log(countHansoo);
}