const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];

rl.on('line', line => {
  input.push(line);
})
  .on('close', () => {
    let result = '';

    for(let i = 1 ; i <= input[0] ; i++){
      let score = 0;
      let count = 0;

      for(let j = 0 ; j < input[i].length ; j++){
      
        if(input[i][j] === "O"){
          count++;
        } else{
          count = 0;
        }

        score += count;
      }

      result += `${score}\n`;
    }

    console.log(result);

    process.exit();
  })