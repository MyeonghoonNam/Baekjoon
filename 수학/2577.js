const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line)
})
  .on('close', () => {
    let numMultifly = parseInt(input[0]) * parseInt(input[1]) * parseInt(input[2]);
    let numCount = Array(10).fill(0);

    numMultifly = numMultifly.toString().split('');
    for(let i = 0 ; i < numMultifly.length ; i++){
      numCount[parseInt(numMultifly[i])]++;
    }

    for(let i = 0 ; i < 10 ; i++){
      console.log(numCount[i]);
    }

    process.exit();
  })