const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const result = [];

rl.on('line', line => {
  const N = parseInt(line);

  for(let i = 0; i < N; i++){
    for(let j = 0; j < N; j++){
      printStar(i, j, N);
    }
    result.push('\n');
  }

  console.log(result.join(''));
  
  rl.close()
  
})
  .on('close', () => {
    process.exit();
  })

function printStar(i, j, N){
  if(parseInt(i / N) % 3 === 1 && parseInt(j / N) % 3 === 1){
    // process.stdout.write(' ');
    result.push(' ');
  } else {
    if(Math.floor(N / 3) === 0){
      // process.stdout.write('*');
      result.push('*')
      
    } else {
      printStar(i, j, N / 3);
    }
  }
}