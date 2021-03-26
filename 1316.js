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
    const wordCount = input[0];
    let groupWordCount = wordCount;

    const words = input.slice(1);

    for(let i = 0 ; i < wordCount; i++){
      const charMap = {};

      for(let j = 0; j < words[i].length; j++){
        if(!charMap[words[i][j]]){
          charMap[words[i][j]] = true;
        } else if(words[i][j] !== words[i][j-1]){
          groupWordCount--;
          break;   
        }
      }
    }
    
    console.log(groupWordCount);
    process.exit();
  })