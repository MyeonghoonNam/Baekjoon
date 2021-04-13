const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  let list = line.split('-');

  solve(list);


  function solve(list){
    let tmp = [];

    for(let i of list){
      let count = 0;
      let n = i.split('+');

      for(let j of n){
        count += parseInt(j);
      }

      tmp.push(count);
    }

    let result = tmp.reduce((acc, cur) => {
      return acc - cur;
    });

    console.log(result);
  }
})
  .on('close', () => {
    process.exit();
})