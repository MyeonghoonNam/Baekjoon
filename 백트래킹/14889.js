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
    const N = input[0][0];
    const stats = input.slice(1);
    const checked = new Array(N+1).fill(false);
    
    let result = 1000000000;
    function dfs(idx, cnt){
      if(cnt === N / 2){

        let start = 0, link = 0;
        for(let i = 1; i <= N; i++){
          for(let j = 1; j <= N; j++){
            if(checked[i] === true && checked[j] === true){
              start += stats[i-1][j-1];
            }

            if(checked[i] === false && checked[j] === false){
              link += stats[i-1][j-1];
            }
          }
        }

      
        let temp = Math.abs(start - link);
        if(result > temp) result = temp;

        return;
      }

      for(let i = idx; i < N; i++){
        checked[i] = true;
        dfs(i + 1, cnt + 1);
        checked[i] = false;
      }
    }

    dfs(1, 0);
    console.log(result);
    process.exit();
  })