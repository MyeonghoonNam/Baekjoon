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
    const triangle = input.slice(1);

    let max = 0;
    for(let i = 1; i < N; i++){
      for(let j = 0; j <= i; j++){
        if(j == 0) {
          triangle[i][j] += triangle[i-1][j];
        } else if(i === j) {
          triangle[i][j] += triangle[i-1][j-1];
        } else {
          triangle[i][j] += Math.max(triangle[i-1][j-1], triangle[i-1][j]);
        }

        if(max < triangle[i][j]) max = triangle[i][j];      
      }

    }

    console.log(max);
    process.exit();
  })