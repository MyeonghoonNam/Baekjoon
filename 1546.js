const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {
    const subjectCount = input[0];
    const subjectScoreArray = input[1];
    const maxScore = Math.max(...input[1]);
    
    for(let i = 0 ; i < subjectScoreArray.length ; i++){
      subjectScoreArray[i] = (subjectScoreArray[i] / maxScore) * 100;
    }

    const sum = subjectScoreArray.reduce((acc, cur) => {
      return acc + cur;
    })

    console.log(sum / subjectCount);

    process.exit();
  })