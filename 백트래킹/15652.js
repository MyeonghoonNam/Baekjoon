const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const input = line.split(' ').map(el => parseInt(el));

  const N = input[0];
  const M = input[1];

  const output = [];

  let result = '';
  function dfs(idx, cnt){
    if(cnt === M){
      result += `${output.join(' ')}\n`;
      return;
    }

    for(let i = idx; i < N; i++){
      output.push(i+1);
      dfs(i, cnt + 1);
      output.pop();
    }
  }

  dfs(0, 0);
  console.log(result);
  rl.close();
})
  .on('close', () => {
    process.exit();
  })