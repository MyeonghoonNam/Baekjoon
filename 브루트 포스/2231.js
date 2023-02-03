const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `216`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());

  let min = 0;
  let num = 1;

  while (num <= 1000000) {
    let sum = num;
    let temp = num;

    while (parseInt(temp / 10) !== 0) {
      sum += temp % 10;
      temp = parseInt(temp / 10);
    }

    sum += temp % 10;

    if (min == 0 && sum === N) {
      min = num;
    } else if (min > num && sum === N) {
      min = num;
    }

    num++;
  }

  return min;
};

console.log(solution());

// const readline = require('readline');

// const rl = readline.createInterface({
//   input:process.stdin,
//   output:process.stdout
// });

// rl.on('line', line => {
//   const C = parseInt(line);

//   let min = 0;
//   let num = 1;
//   while(num <= 1000000){

//     let sum = num;
//     let temp = num;
//     while(parseInt(temp / 10) != 0){
//       sum += temp % 10;
//       temp = parseInt(temp / 10);
//     }

//     sum += temp % 10;

//     if(min == 0 && sum === C){
//       min = num;
//     } else if(min > num && sum === C){
//       min = num;
//     }

//     num++;
//   }

//   if(min === 0){
//     console.log(min);
//   } else{
//     console.log(min);
//   }

// })
//   .on('close', () => {
//     process.exit();
//   })
