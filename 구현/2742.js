const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let answer = '';

rl.on('line', line => {
  let count = parseInt(line);
  let num = count;

  for(let i = 0 ; i < count ; i++){
    answer += num + '\n';
    num--;
  }

  console.log(answer);

  rl.close();
})
  .on('close', () => {
    process.exit();
  })