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
    const numbers = input[1];
    const operator = input[2];

    let max = -1000000000;
    let min = 1000000000;

    function dfs(plus, minus, multifly, divide, cnt, sum){
      if(cnt === N[0]){
        max = Math.max(max, sum);
        min = Math.min(min, sum);
      }

      if(plus > 0){
        dfs(plus - 1, minus, multifly, divide, cnt + 1, sum + numbers[cnt]);
      }

      if(minus > 0){
        dfs(plus, minus - 1, multifly, divide, cnt + 1, sum - numbers[cnt]);
      }

      if(multifly > 0){
        dfs(plus, minus, multifly -1 , divide, cnt + 1, sum * numbers[cnt]);
      }

      if(divide > 0){
        if(sum < 0){
          sum = -sum;
          sum = -parseInt(sum / numbers[cnt]);

          dfs(plus, minus, multifly, divide - 1, cnt + 1, sum);
        } else{

          dfs(plus, minus, multifly, divide - 1, cnt + 1, parseInt(sum / numbers[cnt]));
        }
      }
    }

    dfs(operator[0], operator[1], operator[2], operator[3], 1, numbers[0]);
    console.log(`${max}\n${min}`);
    process.exit();
  })