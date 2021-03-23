const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const alphaCount = {};

  for(let char of line.toLowerCase()){
    alphaCount[char] = alphaCount[char] ? alphaCount[char] + 1 : 1;
  }
  console.log(alphaCount);
  const result = Object.keys(alphaCount);
  console.log(result);
  result.sort();
  console.log(result);
  
  for(let key of result){
    console.log(`${key} = ${alphaCount[key]}`);
  }
})
  .on('close', () => {
    process.exit();
  })