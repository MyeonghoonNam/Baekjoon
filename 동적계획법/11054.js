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
    const numbers = input[1];

    const LIS_DP = [];
    const LDS_DP = [];
  
    LIS();
    LDS();

    let max = 0;
    for(let i = 0; i < N; i++){
      if(max < LIS_DP[i] + LDS_DP[i]){
        max = LIS_DP[i] + LDS_DP[i];
      }
    }

    console.log(max - 1);

    process.exit();

    function LIS(){
      for(let i = 0; i < N; i++){
        LIS_DP[i] = 1;

        for(let j = 0; j < i; j++){
          if(numbers[i] > numbers[j] && LIS_DP[i] < LIS_DP[j] + 1){
            LIS_DP[i] = LIS_DP[j] + 1;
          }
        }
      }
    }

    function LDS(){
      for(let i = N - 1; i >= 0; i--){
        LDS_DP[i] = 1;

        for(let j = N - 1; j > i; j--){

          if(numbers[i] > numbers[j] && LDS_DP[i] < LDS_DP[j] + 1){
            LDS_DP[i] = LDS_DP[j] + 1;
          }
        }
      }
    }
  })