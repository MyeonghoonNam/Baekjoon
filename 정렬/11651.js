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
    const T = input[0];
    const locationArray = input.slice(1);
    
    locationArray.sort((a, b) => {
      return a[1] - b[1] || a[0] - b[0];
    })

    let result = '';
    for(let i = 0; i < T; i++){
      result += `${locationArray[i][0]} ${locationArray[i][1]}\n`
    }

    console.log(result);
    process.exit();
  })