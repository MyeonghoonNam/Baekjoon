const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  if(line === '0 0 0'){
    rl.close();
  }

  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {
    
    for(let i = 0; i < input.length; i++){
      const hypotenuse = Math.max(...input[i]);
      const idx = input[i].indexOf(hypotenuse);
      input[i].splice(idx, 1);

      const [a, b] = input[i];

      if(Math.pow(hypotenuse, 2) === Math.pow(a, 2) + Math.pow(b, 2)){
        console.log("right");
      } else{
        console.log("wrong");
      }
    }
    process.exit();
  })