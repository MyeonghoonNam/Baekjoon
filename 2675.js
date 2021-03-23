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
    const testCaseCount = input[0];
    for(let k = 1; k <= testCaseCount; k++){

      const repeatCount = input[k][0];
      const str = input[k][1];
      let newStr = '';
  
      for(let i = 0; i < str.length; i++){
        for(let j = 0; j < repeatCount; j++){
          newStr += str[i];
        }
      }
      console.log(newStr);
    }

    process.exit();
  })