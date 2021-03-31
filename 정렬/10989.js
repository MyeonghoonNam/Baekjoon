const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(parseInt(line));
})
  .on('close', () => {
    const T = input[0];
    const numbers = input.slice(1);
    const countNums = Array.from({length:10001}, () => 0);
    
    numbers.forEach(num => {
      countNums[num]++;
    })

    let result = '';
    for(let i = 1; i < countNums.length; i++){
      const num = i;
      const count = countNums[i];

      if(count > 0) {
        for(let j = 0; j < count; j++){
          result += num + '\n';
        }

        // result += (num + '\n').repeat(count);
      }
    }
    console.log(result);
    process.exit();
  })