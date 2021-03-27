const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(parseInt(line));
})
  .on('close', () => {
    const testcaseCount = input[0];
    input.splice(0, 1)

    for(let i = 0, idx = 0; i < testcaseCount; i++, idx += 2){
      
      let k = input[idx];
      let n = input[idx+1];
      let peopleCount = [];

      for(let j = 0; j <= k; j++){
        let sum = 0;
        for(let m = 0; m < n; m++){
          if(j === 0){
            peopleCount[m] = m + 1;
          } else {
            sum += peopleCount[m];
            peopleCount[m] = sum;
          }
        }
        
      }

      console.log(peopleCount[n - 1]);
    }

    process.exit();
  })