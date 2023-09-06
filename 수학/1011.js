const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {
    const testcaseCount = input[0];
    input.splice(0, 1);

    for(let i = 0; i < testcaseCount; i++){
      let start = input[i][0];
      let end = input[i][1];
      let distance = end - start;

      let max = parseInt(Math.sqrt(distance));

      if(max === Math.sqrt(distance)){
        console.log(max * 2 - 1);
      } else if(distance <= max * max + max){
        console.log(max * 2);
      } else {
        console.log(max * 2 + 1);
      }
      
    }

    process.exit();
  })