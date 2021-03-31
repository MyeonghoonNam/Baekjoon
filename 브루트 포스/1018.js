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
    const N = input[0][0];
    const M = input[0][1];
    const board = input.slice(1);
    const WB = [
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW"
    ];
    
    const BW = [
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB"
    ]

    let min = 100;
    for(let i = 0; i + 8 <= N; i++){
      for(let j = 0; j + 8 <= M; j++){
        let temp = 0 ;
        temp = Math.min(WB_Count(i, j), BW_Count(i, j));
        if(temp < min){
          min = temp;
        }
      }
    }

    console.log(min);

    function WB_Count(x, y){
      let repaintCnt = 0;
      for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
          if(board[x+i][0][y+j] !== WB[i][j]){
            repaintCnt++;
          }
        }
      }

      return repaintCnt;
    }

    function BW_Count(x, y){
      let repaintCnt = 0;
      for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
          if(board[x+i][0][y+j] !== BW[i][j]){
            repaintCnt++;
          }
        }
      }

      return repaintCnt;
    }

    process.exit();
  });


