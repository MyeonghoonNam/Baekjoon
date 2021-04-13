const input = [[5], [3, 1, 4, 3, 2]];

const N = input[0][0];
const withDrawTime = input[1];

withDrawTime.sort((a, b) => a - b);

let minTotalWithDrawTime = 0;
for(let i = 0; i < N; i++){
  for(let j = 0; j <= i; j++){
    minTotalWithDrawTime += withDrawTime[j];
  }
}

console.log(minTotalWithDrawTime);