const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const ALPHA_COUNT = 26;
rl.on('line', line => {
  const alphaCount = new Array(ALPHA_COUNT).fill(0);

  for(let i = 0; i < line.length; i++){
    alphaCount[line[i].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  const maxCount = Math.max(...alphaCount);
  const maxCountCheck = alphaCount.filter(count => {
    return count === maxCount;
  });

  if(maxCountCheck.length >= 2){
    console.log("?");
  } else {
    const result = alphaCount.indexOf(maxCount) + 'a'.charCodeAt(0);
    console.log(String.fromCharCode(result).toUpperCase());
  }

})
  .on('close', () => {
    process.exit();
  })