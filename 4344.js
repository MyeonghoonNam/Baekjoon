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
    const countTastcase = input[0];

    for(let i = 1 ; i <= countTastcase ; i++){
      const countStudent = input[i][0];
      const score = input[i].slice(1);
      const average = score.reduce((acc, cur) => {
        return acc + cur;
      }) / countStudent;
      const countAverageOverStudent = score.filter((score) => {
        return score > average;
      })
      const result = (countAverageOverStudent.length / countStudent) * 100;
      
      console.log(`${result.toFixed(3)}%`);
    }
    
    process.exit();
  });