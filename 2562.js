const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line);
})
  .on('close', () => {
    const numArray = input;
    let index = 0;
    let maxNum = 0;

    for(let i = 0 ; i < numArray.length ; i++){
      if(parseInt(numArray[i]) > maxNum){
        maxNum = parseInt(numArray[i]);
        index = i;
      }
    }

    console.log(`${maxNum}\n${index+1}`);
    process.exit();
  })