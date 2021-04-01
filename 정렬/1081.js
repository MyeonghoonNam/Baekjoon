const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' '));
})
  .on('close', () => {
    const T = input.shift();
    const idxArr = [];

    for(let i = 0; i < input.length; i++){
      idxArr.push([input[i][0], input[i][1], i]);
    }

    let result = '';
    idxArr
      .sort((a, b) => {
        return a[0] - b[0] || a[2] - b[2];
      })
      .forEach(list => {
        result += `${list[0]} ${list[1]}\n`;
      });

    console.log(result);
    process.exit();
  })