const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const N = parseInt(line);
  const board = [];
  let count = 0;

  function isPossible(idx){
    for(let i = 0; i < idx; i++){
      if(board[idx] === board[i] || idx - i === Math.abs(board[idx]-board[i])){
        return 0;
      }
    }

    return 1;
  }

  function nQueen(idx){
    if(idx === N){
      count++;
      return;
    }

    for(let i = 0; i < N; i++){
      board[idx] = i;

      if(isPossible(idx)){
        nQueen(idx + 1);
      }
    }
  }

  nQueen(0);
  console.log(count);
})
  .on('close', () => {
    process.exit();
  })