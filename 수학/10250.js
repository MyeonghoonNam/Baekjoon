const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];

rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));  
})
  .on('close', () => {

    const testcaseCount = input[0];
    const list = input.slice(1);

    for(let i = 0; i < testcaseCount; i++){
      let H = list[i][0];
      let N = list[i][2];
      
      let yy = '';
      let xx = '';
      
      if(N % H === 0){
        yy = String(H);
        xx = String(N / H);
      } else {
        yy = String(N % H);
        xx = String(Math.ceil(N / H));
      }

      if(xx.length === 1){
        xx = "0" + xx;
      }

      console.log(yy + xx);
    }

    process.exit();
  })