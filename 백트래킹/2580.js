const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const board = [];
rl.on('line', line => {
  board.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {
    
    function sudoku(){
      let x = -1, y = -1;

      for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
          if(board[i][j] === 0){
            x = i;
            y = j;

            break;
          }
        }

        if(x !== -1) break;
      }

      if(x === -1){
        printSudoku();
      }

      for(let i = 1; i <= 9; i++){
        if(isPossible(x, y, i)){
          board[x][y] = i;
          sudoku();
          board[x][y] = 0;
        }
      }
    }

    function isPossible(x, y, n){
      for(let i = 0; i < 9; i++){
        if(board[x][i] === n || board[i][y] === n){
          return false;
        }
      }

      let startX = parseInt((x / 3)) * 3;
      let startY = parseInt((y / 3)) * 3;

      for(let i = startX; i < startX + 3; i++){
        for(let j = startY; j < startY + 3; j++){
          if(board[i][j] === n) {
            return false;
          }
        }
      }

      return true;
    }

    function printSudoku(){
      let result = '';

      for(let i = 0; i < 9; i++){
        result += `${board[i].join(' ')}\n`;
      }

      console.log(result);

      process.exit();
    }

    sudoku();
  })