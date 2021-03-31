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

    numbers.sort((a, b) => a - b);

    const average = (numbers.reduce((acc, cur) =>{
      return acc + cur;
    }) / numbers.length).toFixed(0);

    let median = 0;
    if(numbers.length === 1){
      median = numbers[0];
    } else {
      median = numbers[(Math.floor(numbers.length / 2))];
    }

    const countNums = new Array(8002).fill(0);

    numbers.forEach(num => {
      if(num < 0) {
        countNums[Math.abs(num)]++;
      } else {
        countNums[Math.ceil(countNums.length / 2) + num]++;
      }
    })

    const max = Math.max(...countNums);

    let mode = [];
    for(let i = 1; i < countNums.length; i++){
      if(max === countNums[i]){
        if(i < Math.ceil(countNums.length / 2)){
          mode.push(-i);
        } else {
          mode.push(i % Math.ceil(countNums.length / 2));
        }
      }
    }
    
    mode.sort((a, b) => a - b);
    
    if(mode.length > 1){
      mode = mode.slice(1)[0];
    } else {
      mode = mode[0];
    }

    const range = numbers[numbers.length - 1] - numbers[0];

    console.log(average);
    console.log(median);
    console.log(mode);
    console.log(range);

    process.exit();
  })

  