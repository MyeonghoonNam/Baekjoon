const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let N = Number(input());
  let currentNumber = 665;

  while (N > 0) {
    currentNumber += 1;

    if (String(currentNumber).includes("666")) {
      N -= 1;
    }
  }

  return currentNumber;
};

console.log(solution());

// const readline = require('readline');

// const rl = readline.createInterface({
//   input:process.stdin,
//   output:process.stdout
// });

// rl.on('line', line => {
//   let N = parseInt(line);
//   let theNumberAtTheEnd = 665;
//   while(N > 0){
//     theNumberAtTheEnd++;

//     if(theNumberAtTheEnd.toString().includes('666')){
//       N--;
//     }
//   }

//   console.log(theNumberAtTheEnd);
//   rl.close();
// })
//   .on('close', () => {
//     process.exit();
//   })
