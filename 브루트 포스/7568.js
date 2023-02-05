const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
55 185
58 183
88 186
60 175
46 155`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const sizeTable = [];
  const result = [];

  for (let i = 0; i < N; i++) {
    sizeTable.push(input().split(" ").map(Number));
  }

  for (let i = 0; i < N; i++) {
    let score = 0;

    for (let j = 0; j < N; j++) {
      if (i === j) continue;

      if (
        sizeTable[i][0] < sizeTable[j][0] &&
        sizeTable[i][1] < sizeTable[j][1]
      ) {
        score++;
      }
    }

    result.push(score + 1);
  }

  return result.join(" ");
};

console.log(solution());

// const readline = require('readline');

// const rl = readline.createInterface({
//   input:process.stdin,
//   output:process.stdout
// });

// const input = [];
// rl.on('line', line => {
//   input.push(line.split(' ').map(el => parseInt(el)));
// })
//   .on('close', () => {

//     const N = input[0];
//     const bodyInfo = input.slice(1);

//     const scoreList = [];

//     for(let i = 0; i < N; i++){

//       let score = 0;
//       for(let j = 0; j < N; j++){
//         if(i === j) continue;

//         if(bodyInfo[i][0] < bodyInfo[j][0] && bodyInfo[i][1] < bodyInfo[j][1]){
//           score++;
//         }
//       }

//       scoreList.push(score + 1);
//     }

//     console.log(scoreList.join(' '));

//     process.exit();
//   })
