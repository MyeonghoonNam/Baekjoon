const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const X = parseInt(line);

  if( X === 1 ){
    console.log("1/1");
    rl.close();
  }

  let sum = 1;
  let count = 0;
  let num = 1;

  while(1) {
    sum++;
    count += num;

    if(count >= X){
      break;
    }

    num++;
  }

  let child = 1, parent = 1;
  
  if(sum % 2){
    child = sum - 1;
  } else {
    parent = sum - 1;
  }

  while(1) {
    if(count === X){
      break;
    }

    if(sum % 2){
      parent++;
      child--;
    } else {
      parent--;
      child++;
    }
    count--
  }

  console.log(`${child}/${parent}`)
  rl.close();
})
  .on('close', () => {
    process.exit();
  })