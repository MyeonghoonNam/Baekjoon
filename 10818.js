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
    let numArray = input[1];

    let minNum = numArray.reduce((acc, cur) => {
      return parseInt(acc) > parseInt(cur) ? parseInt(cur) : parseInt(acc);
    })

    let maxNum = numArray.reduce((acc, cur) => {
      return parseInt(acc) > parseInt(cur) ? parseInt(acc) : parseInt(cur);
    })

    console.log(minNum, maxNum);

    process.exit();
  })