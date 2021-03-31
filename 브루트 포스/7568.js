const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {

    const N = input[0];
    const bodyInfo = input.slice(1);

    const scoreList = [];

    for(let i = 0; i < N; i++){

      let score = 0;
      for(let j = 0; j < N; j++){
        if(i === j) continue;

        if(bodyInfo[i][0] < bodyInfo[j][0] && bodyInfo[i][1] < bodyInfo[j][1]){
          score++;
        }
      }

      scoreList.push(score + 1);
    }

    console.log(scoreList.join(' '));

    process.exit();
  })