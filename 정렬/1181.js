const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line);
})
  .on('close', () => {
    const T = input[0];
    let str = input.slice(1);
    str.sort((a, b) =>{
      return a.length - b.length || a.localeCompare(b);
    })

    str = [...new Set(str)];
    
    let result = '';
    for(let i = 0; i < str.length; i++){
      result += `${str[i]}\n`;
    }

    console.log(result);
    process.exit();
  })