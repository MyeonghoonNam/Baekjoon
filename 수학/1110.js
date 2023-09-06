const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let count = 0;
rl.on('line', line => {
  const startNum = parseInt(line);
  let cycleNum = startNum;
  let flag = true;

  while(flag){
    let firstNum = parseInt(cycleNum % 10);
    let secondNum = parseInt(cycleNum / 10);

    cycleNum = firstNum + secondNum;
    cycleNum = `${firstNum}${cycleNum % 10}`;

    count++;

    if(startNum === parseInt(cycleNum)){
      flag = false;
    }
  }

  rl.close();
})
  .on('close', () => {
    console.log(count);

    process.exit();
  })