const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line.split(' '));
  
})
  .on('close', () => {
    const numCount = parseInt(input[0][0]);
    const standardNum = parseInt(input[0][1]);
    const numArray = input[1];

    let result = '';
    for(let i = 0 ; i < numCount ; i++){
      if(numArray[i] < standardNum){
        result += numArray[i] + ' ';
      }
    }

    console.log(result);

    process.exit();
  })